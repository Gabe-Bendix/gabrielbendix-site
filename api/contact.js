const nodemailer = require('nodemailer');

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to create email transporter
function createTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false, // false for 587, true for 465
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });
  }
  return null;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'method_not_allowed',
      message: 'Only POST requests are allowed'
    });
  }

  try {
    const { name, email, subject, message, website } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        ok: false,
        error: 'validation_failed',
        message: 'All fields are required'
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        ok: false,
        error: 'validation_failed',
        message: 'Please enter a valid email address'
      });
    }

    // Honeypot check (bot protection)
    if (website && website.trim() !== '') {
      console.log('Honeypot triggered, likely bot submission');
      return res.status(200).json({ ok: true });
    }

    // Length validation
    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return res.status(400).json({
        ok: false,
        error: 'validation_failed',
        message: 'Input too long'
      });
    }

    // Email configuration
    const emailTo = process.env.EMAIL_TO || 'your-email@example.com';
    const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_USER || 'noreply@gabrielbendix.com';

    const mailOptions = {
      from: `"Portfolio Contact Form" <${emailFrom}>`,
      to: emailTo,
      subject: `Portfolio Contact: ${subject}`,
      text: `
New contact form submission:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}

---
This message was sent from your portfolio contact form.
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background: white; padding: 20px; border-left: 4px solid #4ade80; margin: 20px 0;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
      replyTo: email,
    };

    // Try to send email
    const transporter = createTransporter();
    
    if (transporter) {
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return res.status(200).json({ 
          ok: true,
          message: 'Message sent successfully!'
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError.message);
        
        // Fallback: log the email instead of failing
        console.log('EMAIL WOULD BE SENT:');
        console.log('To:', emailTo);
        console.log('From:', emailFrom);
        console.log('Subject:', mailOptions.subject);
        console.log('Message:', message);
        console.log('Reply-To:', email);
        
        return res.status(200).json({ 
          ok: true,
          message: 'Message received! I\'ll get back to you soon.'
        });
      }
    } else {
      // No SMTP configured - log the message
      console.log('EMAIL RECEIVED (No SMTP configured):');
      console.log('To:', emailTo);
      console.log('From:', emailFrom);
      console.log('Subject:', mailOptions.subject);
      console.log('Message:', message);
      console.log('Reply-To:', email);
      
      return res.status(200).json({ 
        ok: true,
        message: 'Message received! I\'ll get back to you soon.'
      });
    }

  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      ok: false,
      error: 'internal_error',
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
}
