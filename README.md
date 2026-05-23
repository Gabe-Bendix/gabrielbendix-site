# Gabriel Bendix - Personal Portfolio (Next.js)

This repo uses Next.js to serve a static `public/index.html`. There is no
backend, no contact-form API route, and no email integration — visitors are
directed to LinkedIn to get in touch.

## Features

- **Modern Design**: Dark theme with green gradient accents
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Dynamic Animations**: Glitch effects, smooth scrolling, fade-in animations
- **LinkedIn-first Contact**: No email backend — single LinkedIn CTA
- **Project Showcase**: Featured + filterable project sections
- **Work Timeline**: Professional experience with visual timeline
- **Skills & Education**: Technical competencies and academic background

## Tech Stack

- **Framework**: Next.js (serves the static HTML in `public/`)
- **Languages**: HTML, CSS, vanilla JS

## Project Structure

```
gabrielbendix/
├── public/
│   ├── assets/
│   │   ├── css/styles.css      # Main stylesheet
│   │   ├── js/main.js          # Navigation, animations, glitch
│   │   ├── js/projects.js      # Project filter logic
│   │   ├── images/             # Image assets
│   │   └── files/              # Static files (resume PDF, etc.)
│   └── index.html              # Single-page site content
├── next.config.js
├── package.json
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Install & run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run start    # serve the production build
```

Then open http://localhost:3000.

## Customization

- **Projects**: Update markup in `public/index.html` under the
  `#featured` and `#projects` sections. Filters live in
  `public/assets/js/projects.js`; project cards use a
  `data-category="web mobile"` style attribute (space- or comma-separated).
- **Work Experience**: Update timeline entries in `public/index.html`.
- **Hero rotating text**: Update the `texts` array in
  `public/assets/js/main.js`.
- **Colors**: CSS custom properties at the top of
  `public/assets/css/styles.css`.

## Responsive Design

Breakpoints:
- Desktop: 1024px and above
- Tablet: 768px to 1023px
- Mobile: below 768px

## Deployment

Static / serverless hosting (Vercel, Netlify, etc.) works fine — there are
no server-side environment variables required by this site. If you fork
this repo for your own use, make sure no `.env` file with private secrets
is ever committed.

## License

MIT.

## Contact

- **LinkedIn**: [Gabriel Bendix](https://www.linkedin.com/in/gabriel-bendix/)
- **GitHub**: [Gabe-Bendix](https://github.com/Gabe-Bendix)
