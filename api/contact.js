module.exports = async (req, res) => {
  console.log('Contact API called:', req.method);
  
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
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        ok: false,
        error: 'validation_failed',
        message: 'All fields are required'
      });
    }

    // For now, just log the message and return success
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message: message.substring(0, 100) + '...'
    });

    return res.status(200).json({ 
      ok: true,
      message: 'Message received! I\'ll get back to you soon.'
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      ok: false,
      error: 'internal_error',
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
};