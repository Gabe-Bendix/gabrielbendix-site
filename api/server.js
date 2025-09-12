const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow inline scripts for your frontend
}));

// Enable CORS for your frontend (works in development and production)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    
    // Development: Allow any localhost/127.0.0.1/192.168.x.x origin
    if (process.env.NODE_ENV !== 'production') {
      if (origin.match(/^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)(:\d+)?$/)) {
        return callback(null, true);
      }
    }
    
    // Production: Add your actual domain here when you deploy
    const allowedOrigins = [
      'https://yourdomain.com',           // Replace with your actual domain
      'https://www.yourdomain.com',       // Replace with your actual domain  
      'https://gabrielbendix.dev',        // Your mentioned homepage
      'https://www.gabrielbendix.dev'     // Your mentioned homepage
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Reject other origins
    callback(new Error('Not allowed by CORS'));
  },
  credentials: false,
};

app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Rate limiting for contact form
const contactRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 requests per hour per IP
  message: {
    ok: false,
    error: 'rate_limited',
    message: 'Too many contact requests. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Create email transporter
const createTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    // Using SMTP with proper Gmail settings
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false, // false for 587, true for 465
      requireTLS: true, // This is important for Gmail
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: 'SSLv3', // This helps with Gmail compatibility
        rejectUnauthorized: false
      }
    });
  } else {
    console.warn('SMTP credentials not found. Emails will be logged instead of sent.');
    return null;
  }
};

const transporter = createTransporter();

// Test SMTP connection on startup
if (transporter) {
  transporter.verify(function(error, success) {
    if (error) {
      console.warn('⚠️  SMTP connection test failed:', error.message);
      console.log('📧 Email will be logged instead of sent');
    } else {
      console.log('✅ SMTP connection verified successfully');
    }
  });
}

// Validation middleware
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name is required and must be less than 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('subject')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Subject is required and must be less than 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage('Message is required and must be less than 5000 characters'),
  // Honeypot field - should be empty
  body('website')
    .optional()
    .isEmpty()
    .withMessage('Bot detected'),
];

// Contact API endpoint
app.post('/api/contact', contactRateLimit, validateContact, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation failed:', errors.array());
      return res.status(400).json({
        ok: false,
        error: 'validation_failed',
        message: 'Please check your input and try again.'
      });
    }

    const { name, email, subject, message, website } = req.body;

    // Additional honeypot check
    if (website && website.trim() !== '') {
      console.log('Honeypot triggered, likely bot submission');
      // Return success to fool bots
      return res.status(200).json({ ok: true });
    }

    // Email configuration
    const emailTo = process.env.EMAIL_TO || 'gabrielbendix@ufl.edu';
    const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_USER || 'noreply@portfolio.com';

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
      replyTo: email, // Allow easy reply to the sender
    };

    // Send email
    if (transporter) {
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        res.status(200).json({ 
          ok: true,
          message: 'Message sent successfully!'
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError.message || emailError);
        console.log('📧 Falling back to log mode due to SMTP error');
        
        // Fallback: log the email instead of failing
        console.log('EMAIL WOULD BE SENT:');
        console.log('To:', emailTo);
        console.log('From:', emailFrom);
        console.log('Subject:', mailOptions.subject);
        console.log('Message:', message);
        console.log('Reply-To:', email);
        
        res.status(200).json({ 
          ok: true,
          message: 'Message received successfully! (Email logged to console due to SMTP configuration)'
        });
      }
    } else {
      // Fallback: log the email instead of sending
      console.log('EMAIL WOULD BE SENT:');
      console.log('To:', emailTo);
      console.log('From:', emailFrom);
      console.log('Subject:', mailOptions.subject);
      console.log('Message:', message);
      console.log('Reply-To:', email);
      
      res.status(200).json({ 
        ok: true,
        message: 'Message received successfully! (Email logged to console)'
      });
    }

  } catch (error) {
    console.error('Contact API error:', error);
    res.status(500).json({
      ok: false,
      error: 'internal_error',
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    ok: true, 
    service: 'Portfolio Contact API',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Contact API server running on http://localhost:${PORT}`);
  console.log(`📧 Email configuration: ${transporter ? 'SMTP Configured' : 'Logging Mode'}`);
  console.log(`🛡️  Security: Rate limiting, validation, and honeypot active`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
