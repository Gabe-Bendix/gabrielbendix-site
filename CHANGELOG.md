# Changelog

All notable changes to Gabriel Bendix Portfolio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Removed
- Gmail SMTP contact-form backend (`api/contact.js`, `api/server.js`,
  `api/test.js`, `pages/api/contact.js`, `dev-server.js`,
  `temp_api_backup/`).
- Frontend contact form and `public/assets/js/contact.js`.
- `nodemailer` dependency.
- `EMAIL_FROM`, `EMAIL_TO`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
  `SMTP_PASS` environment variable usage. These must be removed from any
  deployment provider and the Gmail app password should be revoked.

### Changed
- Contact section is now a single LinkedIn-focused "Let's Connect" card.
- Featured project is the ISQED 2026 publication on real-time edge
  semantics for drone swarms via FPGA + on-device LLMs.
- LensLink marketplace moved to the Other Projects list under the Web
  Development and Mobile filters.
- Hero rotating roles include "Incoming Texas Instruments Intern".
- Who I Am section updated with summer 2026 TI internship details.
- Added Texas Instruments upcoming-internship entry to Work Experience.

### Security
- Removed permissive CORS contact endpoint.
- Removed nodemailer + Gmail SMTP integration from the codebase.
- Added missing `rel="noopener noreferrer"` to footer social links.

## [1.0.0] - 2025-09-11

### Added
- Initial portfolio website with modern dark theme
- Responsive navigation with hamburger menu
- Hero section with animated glitch background
- Featured project spotlight section
- Project gallery with filtering capabilities
- Work experience timeline
- Skills and education sections
- Contact form with backend API integration
- SMTP email functionality
- Rate limiting and security features
- Mobile-first responsive design
- Smooth scrolling and fade-in animations

### Features
- **Navigation**: Fixed header with smooth scroll navigation
- **Hero Section**: Profile image with glitch effect and rotating text
- **Projects**: 
  - Featured project: "Quantization with Finn"
  - Project cards: Portfolio Website, FEI University Robotics, DPU Research, FireArchy, MediConnect, LeakLock
- **Work Experience**: Visual timeline with company details
- **About**: Skills showcase and education information
- **Contact**: Form with honeypot protection and email integration

### Technical Implementation
- Vanilla HTML5, CSS3, JavaScript (ES6+)
- Node.js/Express.js backend API
- Gmail SMTP integration
- CSS Grid and Flexbox layouts
- CSS custom properties for theming
- Intersection Observer API for animations
- Canvas API for glitch effects

### Security
- CORS protection
- Rate limiting (10 requests/hour)
- Input validation and sanitization
- Honeypot spam protection
- Environment variable configuration

### Performance
- Optimized images and assets
- Minimal JavaScript bundle
- Efficient CSS organization
- Lazy loading considerations

---

## Development Notes

### Project Structure
```
gabrielbendix/
├── assets/
│   ├── css/styles.css
│   ├── js/
│   │   ├── main.js
│   │   ├── contact.js
│   │   └── projects.js
│   └── images/
├── api/server.js
├── index.html
└── package.json
```

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Known Issues
- None currently identified

### Future Enhancements
- [ ] Add project detail pages
- [ ] Implement blog section
- [ ] Add dark/light theme toggle
- [ ] Include testimonials section
- [ ] Add more interactive animations
- [ ] Implement analytics tracking
- [ ] Add PWA capabilities
- [ ] Include automated testing
