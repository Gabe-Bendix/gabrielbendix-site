# Gabriel Bendix - Personal Portfolio (Next.js)

This repo now uses Next.js to serve your existing static `public/index.html` and keeps the contact form working via `pages/api/contact.js`.

## 🚀 Features

- **Modern Design**: Dark theme with green gradient accents
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Dynamic Animations**: Glitch effects, smooth scrolling, and fade-in animations
- **Contact Form**: Integrated email functionality for direct communication
- **Project Showcase**: Featured and regular project sections with detailed descriptions
- **Work Timeline**: Professional experience with visual timeline
- **Skills & Education**: Technical competencies and academic background

## 🛠️ Tech Stack

- **Frontend**: Next.js serving static HTML from `public/`
- **API**: Next.js API Route wrapping your existing handler
- **Email**: SMTP integration with Gmail (nodemailer)

## 📁 Project Structure

```
gabrielbendix/
├── assets/
│   ├── css/
│   │   └── styles.css          # Main stylesheet
│   ├── js/
│   │   ├── main.js             # Core functionality
│   │   ├── contact.js          # Contact form handling
│   │   └── projects.js         # Project filtering/display
│   └── images/                 # Image assets
├── api/
│   └── server.js               # Express.js backend server
├── docs/                       # Documentation
├── index.html                  # Main landing page
├── package.json                # Node.js dependencies
├── .env.example               # Environment variables template
└── README.md                  # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gabrielbendix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your email credentials
   ```

4. **Start Development Servers**
   ```bash
   # Option 1: Start both servers together
   npm run dev
   
   # Option 2: Start individually
   npm run backend    # API server on :8000
   npm run frontend   # Static server on :3001
   ```

5. **Open your browser**
   ```
   http://localhost:3001
   ```

## 📧 Email Configuration

To receive contact form messages in your inbox using Gmail SMTP, create a `.env` file in the project root with:

```env
# SMTP Settings (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Where to send contact form submissions
EMAIL_TO=your-email@gmail.com
EMAIL_FROM=your-email@gmail.com
```

### Gmail Setup
1. Enable 2-factor authentication on your Google account
2. Create an App Password: Google Account → Security → App passwords
3. Use the app password as `SMTP_PASS`
4. Restart the dev server after changes: `npm run dev`

### Vercel Production
Set the same variables in Vercel → Project → Settings → Environment Variables and redeploy.

## 🎨 Customization

### Colors
Main color variables are defined in `assets/css/styles.css`:
```css
:root {
  --primary-green: #4ade80;
  --dark-bg: #0a0a0a;
  --card-bg: rgba(255, 255, 255, 0.05);
}
```

### Content
- **Projects**: Update project data in `assets/js/projects.js`
- **Personal Info**: Modify content in `index.html`
- **Images**: Replace files in `assets/images/`

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

## 🔧 Development

### Available Scripts
```bash
npm run dev        # Start both frontend and backend
npm run start      # Start backend only
npm run frontend   # Start frontend only
npm run lint       # Check code quality
```

### File Organization
- Keep CSS organized in logical sections
- Use semantic HTML elements
- Follow JavaScript ES6+ best practices
- Maintain consistent naming conventions

## 🚀 Deployment

### Static Hosting (Frontend Only)
- Netlify, Vercel, GitHub Pages
- Build: Upload all files except `server.js` and `node_modules`
- Configure contact form with external service (Formspree, Netlify Forms)

### Full Stack Hosting
- Heroku, Railway, DigitalOcean
- Include both frontend and backend
- Set environment variables in hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- **LinkedIn**: [Gabriel Bendix](https://linkedin.com/in/your-profile)
- **GitHub**: [Gabe-Bendix](https://github.com/Gabe-Bendix)

---

*Built with ❤️ by Gabriel Bendix*
