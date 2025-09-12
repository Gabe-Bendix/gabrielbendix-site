/**
 * @fileoverview Main JavaScript functionality for Gabriel Bendix Portfolio
 * @description Handles navigation, animations, scroll effects, and glitch background
 * @author Gabriel Bendix
 * @version 1.0.0
 * @since 2025
 */

//=============================================================================
// NAVIGATION & MOBILE MENU
//=============================================================================

/**
 * Mobile Navigation Toggle
 * Handles hamburger menu functionality for responsive design
 */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            // Close mobile menu if open
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            
            // Calculate offset for navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active navigation link
            updateActiveNavLink(this);
        }
    });
});

// Update active navigation link
function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Track scroll position and update active nav link
function handleScrollNavigation() {
    const sections = ['home', 'featured', 'projects', 'work', 'about', 'contact'];
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight + 100;
    
    let currentSection = 'home';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section && scrollPosition >= section.offsetTop) {
            currentSection = sectionId;
        }
    });
    
    // Update active nav link based on current section
    const activeNavLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
    if (activeNavLink && !activeNavLink.classList.contains('active')) {
        updateActiveNavLink(activeNavLink);
    }
}

// Single optimized scroll event handler
let scrollAnimationFrame;

function handleAllScrollEvents() {
    if (scrollAnimationFrame) {
        cancelAnimationFrame(scrollAnimationFrame);
    }
    
    scrollAnimationFrame = requestAnimationFrame(() => {
        handleScrollNavigation();
        handleGlitchVisibility();
        handleNavbarBackground();
    });
}

// Handle navbar background change
function handleNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'transparent';
        }
    }
}

window.addEventListener('scroll', handleAllScrollEvents, { passive: true });

// Handle glitch canvas smooth fade based on scroll position
function handleGlitchVisibility() {
    const heroSection = document.querySelector('.hero');
    const glitchCanvas = document.getElementById('glitch-canvas');
    
    if (!heroSection || !glitchCanvas) return;
    
    const heroRect = heroSection.getBoundingClientRect();
    const fadeZone = 100; // Shorter fade zone for quicker disappearance
    
    let opacity = 1;
    
    if (heroRect.bottom <= 0) {
        // Completely scrolled past hero - ensure it's fully hidden
        opacity = 0;
    } else if (heroRect.bottom < fadeZone) {
        // In fade zone - calculate opacity based on remaining visible area
        opacity = Math.max(0, heroRect.bottom / fadeZone);
        // Apply strong easing to fade out quickly
        opacity = opacity * opacity * opacity; // Cubic easing for faster fade
    } else {
        // Hero fully visible
        opacity = 1;
    }
    
    // Apply smooth opacity change with complete hiding at low opacity
    if (opacity < 0.05) {
        glitchCanvas.style.opacity = '0';
        glitchCanvas.style.visibility = 'hidden';
    } else {
        glitchCanvas.style.opacity = opacity;
        glitchCanvas.style.visibility = 'visible';
    }
}

// Navbar background handling moved to consolidated scroll handler above

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .hero-text, .hero-image');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Uncomment the line below to enable typing effect
        // typeWriter(heroTitle, originalText, 50);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Glitch Background Effect
function initGlitchBackground() {
    console.log('Initializing glitch background...');
    
    const canvas = document.getElementById('glitch-canvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }
    
    console.log('Canvas found:', canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get 2D context!');
        return;
    }
    
    let animationId;
    let time = 0;
    let letters = [];
    let grid = { columns: 0, rows: 0 };
    let lastGlitchTime = Date.now();
    
    // Glitch effect parameters
    const glitchColors = ['#2b4539', '#61dca3', '#61b3dc'];
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789";
    const fontSize = 16;
    const charWidth = 10;
    const charHeight = 20;
    const glitchSpeed = 50;
    
    const getRandomChar = () => {
        return characters[Math.floor(Math.random() * characters.length)];
    };
    
    const getRandomColor = () => {
        return glitchColors[Math.floor(Math.random() * glitchColors.length)];
    };
    
    const calculateGrid = (width, height) => {
        const columns = Math.ceil(width / charWidth);
        const rows = Math.ceil(height / charHeight);
        return { columns, rows };
    };
    
    const initializeLetters = (columns, rows) => {
        grid = { columns, rows };
        const totalLetters = columns * rows;
        letters = Array.from({ length: totalLetters }, () => ({
            char: getRandomChar(),
            color: getRandomColor(),
            alpha: Math.random() * 0.5 + 0.1
        }));
    };
    
    const resizeCanvas = () => {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) {
            console.error('Hero section not found!');
            return;
        }
        
        // Use hero section dimensions to contain the canvas
        const heroWidth = heroSection.offsetWidth;
        const heroHeight = heroSection.offsetHeight;
        
        console.log('Canvas size:', heroWidth, 'x', heroHeight);
        
        // Set canvas to exact dimensions without any dynamic calculation
        canvas.width = heroWidth;
        canvas.height = heroHeight;
        
        // Important: Don't set style dimensions - let CSS handle it
        const { columns, rows } = calculateGrid(heroWidth, heroHeight);
        initializeLetters(columns, rows);
    };
    
    const drawLetters = () => {
        // Clear canvas with black background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set font
        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = 'top';
        
        letters.forEach((letter, index) => {
            const x = (index % grid.columns) * charWidth;
            const y = Math.floor(index / grid.columns) * charHeight;
            
            // Add some transparency variation
            const color = letter.color;
            const alpha = letter.alpha;
            ctx.fillStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            ctx.fillText(letter.char, x, y);
        });
    };
    
    const updateLetters = () => {
        const updateCount = Math.max(1, Math.floor(letters.length * 0.03));
        
        for (let i = 0; i < updateCount; i++) {
            const index = Math.floor(Math.random() * letters.length);
            if (letters[index]) {
                letters[index].char = getRandomChar();
                letters[index].color = getRandomColor();
                letters[index].alpha = Math.random() * 0.7 + 0.1;
            }
        }
    };
    
    const animate = () => {
        // Fade letters over time
        letters.forEach(letter => {
            letter.alpha *= 1.0;
            if (letter.alpha < 0.05) {
                letter.alpha = 0.05;
            }
        });
        
        drawLetters();
        animationId = requestAnimationFrame(animate);
    };
    
    // Manual glitch trigger function
    const triggerGlitch = () => {
        updateLetters();
    };
    
    // Initialize
    resizeCanvas();
    animate();
    
    console.log('Glitch animation started!');
    
    // Handle resize - only on actual window resize, not scroll
    let resizeTimeout;
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    
    const handleResize = () => {
        // Only resize if window dimensions actually changed
        if (window.innerWidth !== lastWidth || window.innerHeight !== lastHeight) {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                lastWidth = window.innerWidth;
                lastHeight = window.innerHeight;
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
                resizeCanvas();
                animate();
            }, 150);
        }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Return object with cleanup and trigger functions
    return {
        cleanup: () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            window.removeEventListener('resize', handleResize);
        },
        triggerGlitch: triggerGlitch
    };
}

// Rotating Text Effect
function initRotatingText() {
    const rotatingElement = document.querySelector('.rotating-text');
    if (!rotatingElement) return;
    
    const texts = [
        'UF Student',
        'Software Developer',
        'Computer Engineer',
        'FPGA Researcher'
    ];
    
    let currentIndex = 0;
    
    function rotateText() {
        rotatingElement.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            rotatingElement.textContent = texts[currentIndex];
            rotatingElement.style.opacity = '1';
        }, 300);
    }
    
    // Return the rotation function for synchronized timing
    return rotateText;
}

// Synchronized Effects Controller
function initSynchronizedEffects() {
    console.log('Initializing synchronized effects...');
    
    const glitchController = initGlitchBackground();
    const rotateTextFunction = initRotatingText();
    
    if (!glitchController || !rotateTextFunction) {
        console.error('Failed to initialize effects');
        return;
    }
    
    // Synchronized trigger function
    function triggerBothEffects() {
        glitchController.triggerGlitch();
        rotateTextFunction();
    }
    
    // Start both effects after 2 seconds, then every 2 seconds
    setTimeout(() => {
        // Trigger first time
        triggerBothEffects();
        
        // Set up interval for synchronized updates
        setInterval(triggerBothEffects, 2000);
    }, 2000);
    
    console.log('Synchronized effects started!');
}

// Initialize synchronized effects when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing synchronized effects...');
    initSynchronizedEffects();
});

// Fallback: Simple animated background if glitch fails
function createFallbackBackground() {
    const canvas = document.getElementById('glitch-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let time = 0;
    
    function animate() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Clear canvas
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw moving dots
        for (let i = 0; i < 50; i++) {
            const x = (Math.sin(time + i) * canvas.width / 2) + canvas.width / 2;
            const y = (Math.cos(time + i * 0.5) * canvas.height / 2) + canvas.height / 2;
            const size = Math.sin(time + i) * 3 + 3;
            
            ctx.fillStyle = `rgba(74, 222, 128, ${Math.sin(time + i) * 0.5 + 0.5})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        time += 0.02;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Try glitch first, fallback to simple animation
setTimeout(() => {
    const canvas = document.getElementById('glitch-canvas');
    if (canvas && canvas.width === 0) {
        console.log('Glitch failed, using fallback animation');
        createFallbackBackground();
    }
}, 1000);

// Parallax effect removed - was interfering with glitch background
// The parallax transform was causing the glitch canvas tracking issues

// Add click effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
