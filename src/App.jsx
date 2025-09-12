import { useState } from 'react';
import LetterGlitch from './components/LetterGlitch';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'projects':
        return <ProjectsPage />;
      case 'work':
        return <WorkPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

// Navigation Component
function Navigation({ currentPage, setCurrentPage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>
            Gabriel Bendix
          </a>
        </div>
        
        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map(item => (
            <a
              key={item.id}
              href="#"
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(item.id);
                setIsMobileMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
        
        <div className="nav-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
}

// Home Page Component
function HomePage() {
  return (
    <>
      <section className="hero">
        <LetterGlitch 
          glitchSpeed={50} 
          centerVignette={true} 
          outerVignette={false} 
          smooth={true}
        />
        <div className="hero-container">
          <div className="hero-content-rectangle">
            <div className="hero-image">
              <img 
                src="/images/pfp.JPG" 
                alt="Professional photo of Gabriel Bendix at the 2024 AKC National Championship" 
                className="hero-photo"
              />
            </div>
            <div className="hero-text">
              <h1 className="hero-title">
                Gabriel Bendix, a <span className="rotating-text">UF Student</span>
              </h1>
              <p className="hero-description">
                I'm a fourth year Computer Engineer at the University of Florida and recent SWE at CANAC based out of Gainesville, Florida. I love to talk hardware, robotics, and cryptography.
              </p>
              <div className="hero-buttons">
                <a href="#" className="btn btn-primary">View My Work</a>
                <a href="#" className="btn btn-secondary">Get In Touch</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-projects">
        <div className="container">
          <h2 className="section-title">Featured Project</h2>
          <div className="projects-grid">
            <div className="project-card featured">
              <div className="project-image">
                <img src="/images/portfolio.png" alt="Portfolio Website" className="project-img" />
              </div>
              <div className="project-content">
                <h3>Portfolio Website</h3>
                <p>A custom Next.js/Tailwind portfolio showcasing my projects, rotating text animations, and responsive design to highlight my skills and experience.</p>
                <div className="project-tech">
                  <span className="tech-tag">Next.js & React.js Development</span>
                  <span className="tech-tag">Tailwind CSS & Responsive Design</span>
                  <span className="tech-tag">UI/UX Animation and Interaction</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/Gabe-Bendix/gabrielbendix-site.git" className="project-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i> Code
                  </a>
                  <a href="https://www.gabrielbendix.com" className="project-link" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Projects Page Component
function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A custom Next.js/Tailwind portfolio showcasing my projects, rotating text animations, and responsive design to highlight my skills and experience.",
      image: "/images/portfolio.png",
      category: "web",
      tech: ["Next.js & React.js Development", "Tailwind CSS & Responsive Design", "UI/UX Animation and Interaction"],
      links: {
        code: "https://github.com/Gabe-Bendix/gabrielbendix-site.git",
        demo: "https://www.gabrielbendix.com"
      }
    },
    {
      id: 2,
      title: "The LeakLock",
      description: "Designed a pressure-sensing valve that instantly shuts off damaged sprinkler systems with home and industrial applications.",
      image: "/images/LeakLock.JPG",
      category: "robotics",
      tech: ["Rapid Prototyping & CAD Design", "Lean Innovation & Pitch Crafting", "Collaborative Problem Solving"],
      links: {
        linkedin: "https://www.linkedin.com/posts/gabriel-bendix_last-tuesdayi-had-the-opportunity-to-participate-activity-7186736561604964352-fYGg?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEEPwj8Bbmf-5BAFm33qVwq1O5r4D3HIcKo"
      }
    },
    {
      id: 3,
      title: "FPGA Digital Signal Processor",
      description: "Designed and implemented a digital signal processing system on FPGA for real-time audio processing and filtering applications.",
      image: null,
      category: "fpga",
      tech: ["Verilog", "VHDL", "Vivado", "Digital Signal Processing"],
      links: {
        code: "#",
        demo: "#"
      }
    }
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'fpga', label: 'FPGA' },
    { id: 'robotics', label: 'Robotics' }
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <section className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="filter-buttons">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card" data-category={project.category}>
              <div className="project-image">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="project-img" />
                ) : (
                  <div className="placeholder-image">
                    <i className="fas fa-microchip"></i>
                  </div>
                )}
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.links.code && (
                    <a href={project.links.code} className="project-link" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github"></i> Code
                    </a>
                  )}
                  {project.links.demo && (
                    <a href={project.links.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                  )}
                  {project.links.linkedin && (
                    <a href={project.links.linkedin} className="project-link" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin"></i> LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Work Page Component
function WorkPage() {
  const workExperience = [
    {
      title: "Web Developer",
      company: "CANAC",
      period: "2024 - Present",
      description: "Developed and maintained web applications using modern technologies.",
      achievements: [
        "Built responsive web interfaces using React and Next.js",
        "Implemented RESTful APIs and database integration",
        "Collaborated with cross-functional teams on product development"
      ],
      technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "TypeScript"]
    },
    {
      title: "FPGA Researcher",
      company: "University of Florida",
      period: "2023 - 2024",
      description: "Conducted research on FPGA-based digital signal processing systems.",
      achievements: [
        "Designed and implemented FPGA circuits using Verilog",
        "Developed algorithms for real-time signal processing",
        "Published research findings in academic journals"
      ],
      technologies: ["Verilog", "VHDL", "Vivado", "MATLAB", "Python"]
    },
    {
      title: "Outreach Coordinator",
      company: "EII IGNITE",
      period: "2022 - 2023",
      description: "Coordinated outreach programs and community engagement initiatives.",
      achievements: [
        "Organized educational workshops and events",
        "Managed social media and marketing campaigns",
        "Built partnerships with local organizations"
      ],
      technologies: ["Social Media", "Event Planning", "Community Outreach"]
    },
    {
      title: "Civil Engineering Intern",
      company: "Lead Engineering Contractors",
      period: "2021 - 2022",
      description: "Assisted in civil engineering projects and construction management.",
      achievements: [
        "Supported project planning and design processes",
        "Conducted site inspections and quality control",
        "Prepared technical documentation and reports"
      ],
      technologies: ["AutoCAD", "Project Management", "Quality Control"]
    }
  ];

  return (
    <section className="work">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        <div className="work-timeline">
          {workExperience.map((job, index) => (
            <div key={index} className="work-item">
              <div className="work-content">
                <h3>{job.title}</h3>
                <h4>{job.company}</h4>
                <span className="work-period">{job.period}</span>
                <p>{job.description}</p>
                <ul className="work-achievements">
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
                <div className="work-tech">
                  {job.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Page Component
function AboutPage() {
  const skills = {
    "Hardware Development": ["FPGA Design", "Digital Signal Processing", "Circuit Design", "Embedded Systems"],
    "Full-Stack Development": ["React", "Next.js", "Node.js", "Python", "JavaScript", "TypeScript"],
    "Programming Languages": ["Python", "JavaScript", "TypeScript", "C++", "Verilog", "VHDL"],
    "Tools & Others": ["Git", "Docker", "AWS", "AutoCAD", "MATLAB", "Vivado"]
  };

  return (
    <section className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <img src="/images/pfp.JPG" alt="Gabriel Bendix" className="professional-photo-img" />
          </div>
          <div className="about-text">
            <h2>About Me</h2>
            <p>
              I'm a passionate Computer Engineering student at the University of Florida with a strong interest in 
              hardware design, software development, and emerging technologies. I enjoy working on projects that 
              combine both hardware and software aspects, particularly in areas like FPGA design, robotics, and 
              full-stack web development.
            </p>
            <p>
              When I'm not coding or studying, you can find me working on personal projects, exploring new 
              technologies, or participating in hackathons and engineering competitions.
            </p>
          </div>
        </div>
        
        <div className="skills-section">
          <h3>Technical Skills</h3>
          <div className="skills-grid">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="skill-category">
                <h4>{category}</h4>
                <div className="skill-tags">
                  {skillList.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="education-section">
          <h3>Education</h3>
          <div className="education-item">
            <h4>Bachelor of Science in Computer Engineering</h4>
            <p>University of Florida</p>
            <span className="education-period">2022 - EST Dec. 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Page Component
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I'm always interested in new opportunities and exciting projects. 
              Feel free to reach out if you'd like to collaborate or just say hello!
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>gabriel.bendix@ufl.edu</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Gainesville, FL</span>
              </div>
            </div>
            <div className="contact-social">
              <a href="https://github.com/Gabe-Bendix" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/gabriel-bendix/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://www.youtube.com/@gabrielbendix3750" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://x.com/GabsBends" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <h3>Gabriel Bendix</h3>
            <p>Computer Engineering Student & Software Developer</p>
          </div>
          <div className="footer-social">
            <a href="https://github.com/Gabe-Bendix" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/gabriel-bendix/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.youtube.com/@gabrielbendix3750" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://x.com/GabsBends" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Gabriel Bendix, all rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default App;
