// The Gmail SMTP contact form has been removed. This stub exists only so
// any cached client that still POSTs to /api/contact receives a clear
// 410 Gone response and is pointed at LinkedIn.
export default function handler(req, res) {
  res.status(410).json({
    ok: false,
    error: 'gone',
    message:
      'The contact form has been removed. Please reach out via LinkedIn: https://www.linkedin.com/in/gabriel-bendix/',
  });
}
