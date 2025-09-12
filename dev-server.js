require('dotenv').config();
const express = require('express');
const path = require('path');
const contactHandler = require('./api/contact.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Serve static files from the root directory
app.use(express.static('.'));

// Handle API route
app.all('/api/contact', async (req, res) => {
  console.log(`📨 API Request: ${req.method} /api/contact`);
  
  // Convert Express req/res to Vercel-like format
  const vercelReq = {
    method: req.method,
    body: req.body,
    headers: req.headers,
    query: req.query
  };

  const vercelRes = {
    setHeader: (key, value) => res.setHeader(key, value),
    status: (code) => {
      res.statusCode = code;
      return {
        json: (data) => res.json(data),
        end: () => res.end()
      };
    },
    end: () => res.end()
  };

  try {
    await contactHandler(vercelReq, vercelRes);
  } catch (error) {
    console.error('API handler error:', error);
    res.status(500).json({
      ok: false,
      error: 'internal_error',
      message: 'An unexpected error occurred.'
    });
  }
});

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404s
app.use((req, res) => {
  console.log(`❌ 404: ${req.method} ${req.url}`);
  res.status(404).json({
    ok: false,
    error: 'not_found',
    message: `Route ${req.url} not found`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Development server running at http://localhost:${PORT}`);
  console.log(`📄 Website: http://localhost:${PORT}`);
  console.log(`🔌 API: http://localhost:${PORT}/api/contact`);
  console.log('');
  console.log('Press Ctrl+C to stop the server');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down development server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down development server...');
  process.exit(0);
});
