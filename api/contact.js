const nodemailer = require('nodemailer');

function createTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      }
    });
  }
  return null;
}

module.exports = async (req, res) => {
  console.log('Contact API called:', req.method);
  
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({
      ok: false,
      error: 'method_not_allowed',
      message: 'Only POST requests are allowed'
    });
  }

  try {
    console.log('Processing POST request, body:', req.body);
    const { name, email, subject, message, website } = req.body;

    // Honeypot check (bot prevention)
    if (website && website.trim() !== '') {
      console.log('Honeypot triggered - potential bot');
      return res.status(200).json({ 
        ok: true,
        message: 'Message received! I\'ll get back to you soon.'
      });
    }

    // Basic validation
    if (!name || !email || !subject || !message) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({
        ok: false,
        error: 'validation_failed',
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed - invalid email');
      return res.status(400).json({
        ok: false,
        error: 'validation_failed',
        message: 'Please enter a valid email address'
      });
    }

    // Length validation
    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      console.log('Validation failed - content too long');
      return res.status(400).json({
        ok: false,
        error: 'validation_failed',
        message: 'Content exceeds maximum length'
      });
    }

    // Log the successful submission
    console.log('Contact form submission received:', {
      name: name,
      email: email,
      subject: subject,
      messageLength: message.length,
      timestamp: new Date().toISOString()
    });

    const transporter = createTransporter();
    const emailTo = process.env.EMAIL_TO || process.env.SMTP_USER;
    const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_USER || 'noreply@portfolio.com';

    const mailOptions = {
      from: `"Portfolio Contact Form" <${emailFrom}>`,
      to: emailTo,
      subject: `Portfolio Contact: ${subject}`,
      text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n`,
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

    if (transporter && emailTo) {
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return res.status(200).json({ ok: true, message: 'Message sent successfully!' });
      } catch (emailError) {
        console.warn('Email sending failed, falling back to log mode:', emailError.message || emailError);
      }
    }

    // Fallback: log instead of send if SMTP not configured or failed
    console.log('EMAIL WOULD BE SENT:', { to: emailTo, from: emailFrom, subject: mailOptions.subject });
    console.log('Full message content:', message);
    return res.status(200).json({ ok: true, message: 'Message received successfully! (Email logged to console)' });

  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      ok: false,
      error: 'internal_error',
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
};