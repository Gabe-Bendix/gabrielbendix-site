// app/api/contact/route.ts
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // for typing getClientIp

// ────── RATE LIMIT CONFIG ──────
// Allow at most 1 submission per IP every 60 000 ms (1 minute).
const timeWindow = 60_000;
const maxSubmissions = 1;

// In-memory store: Map<ipAddress, { count: number; firstRequestTime: number }>
const ipStore = new Map<string, { count: number; firstRequestTime: number }>();

// Helper to extract client IP from headers (x-forwarded-for) or fallback to “unknown”
function getClientIp(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0].trim();
  }
  return "unknown";
}

// ───── SMTP CONFIGURATION ─────
// 1) Read from environment (these are typed as `string | undefined`)
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

// Error if any credential is missing
if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
  throw new Error(
    "Missing SMTP configuration. Please ensure SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS are set in .env.local"
  );
}

// 2) Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465, // SSL for port 465, otherwise TLS
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

// 3) Verify callback
transporter.verify((error: Error | null) => {
  if (error) {
    console.error("❌ SMTP configuration is invalid:", error);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

// 4) Handle POST requests
export async function POST(request: NextRequest) {
  const now = Date.now();
  const ip = getClientIp(request);

  // ────── RATE LIMIT CHECK ──────
  const record = ipStore.get(ip);
  if (record) {
    const elapsed = now - record.firstRequestTime;
    if (elapsed < timeWindow) {
      if (record.count >= maxSubmissions) {
        return NextResponse.json(
          { error: "Too many submissions. Please wait before trying again." },
          { status: 429 }
        );
      } else {
        record.count += 1;
        ipStore.set(ip, record);
      }
    } else {
      // Reset window
      ipStore.set(ip, { count: 1, firstRequestTime: now });
    }
  } else {
    ipStore.set(ip, { count: 1, firstRequestTime: now });
  }

  // ────── PARSE AND VALIDATE BODY ──────
  try {
    const body = await request.json();
    const { name, email, message } = body as {
      name: unknown;
      email: unknown;
      message: unknown;
    };

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        {
          error: "Name, email, and message are all required and must be nonempty strings.",
        },
        { status: 400 }
      );
    }

    // ────── BUILD EMAIL PAYLOAD ──────
    const mailOptions = {
      from: `"Contact Form" <${smtpUser}>`,
      to: smtpUser,
      subject: `New message from ${name} <${email}>`,
      text: `
You have a new contact form submission:

Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `.trim(),
    };

    // ────── SEND EMAIL ──────
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
