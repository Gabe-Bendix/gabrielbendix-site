// Projects Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Filter projects based on category
    function filterProjects(category) {
        projectCards.forEach(card => {
            const raw = card.getAttribute('data-category') || '';
            const categories = raw.split(/[ ,]+/).filter(Boolean);

            if (category === 'all' || categories.includes(category)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter category
            const category = this.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(category);
        });
    });

    // Add CSS animation for fade in effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .project-card {
            animation: fadeInUp 0.5s ease forwards;
        }
    `;
    document.head.appendChild(style);
});

// Project card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
    });
});

// Intersection Observer for project cards animation
document.addEventListener('DOMContentLoaded', function() {
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

    // Observe all project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Project link click tracking (for analytics)
document.addEventListener('DOMContentLoaded', function() {
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const projectTitle = this.closest('.project-card').querySelector('h3').textContent;
            const linkType = this.textContent.trim();
            
            // You can add analytics tracking here
            console.log(`Project link clicked: ${projectTitle} - ${linkType}`);
            
            // Optional: Add a small delay for visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Tech tag hover effects
document.addEventListener('DOMContentLoaded', function() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(74, 222, 128, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Featured project highlighting
document.addEventListener('DOMContentLoaded', function() {
    const featuredProjects = document.querySelectorAll('.project-card.featured');
    
    featuredProjects.forEach(project => {
        // Add a subtle glow effect to featured projects
        project.style.position = 'relative';
        project.style.overflow = 'hidden';
        
        // Create a subtle animated background
        const glowEffect = document.createElement('div');
        glowEffect.style.position = 'absolute';
        glowEffect.style.top = '0';
        glowEffect.style.left = '0';
        glowEffect.style.right = '0';
        glowEffect.style.bottom = '0';
        glowEffect.style.background = 'linear-gradient(45deg, transparent, rgba(74, 222, 128, 0.05), transparent)';
        glowEffect.style.animation = 'glow 3s ease-in-out infinite';
        glowEffect.style.pointerEvents = 'none';
        
        project.appendChild(glowEffect);
    });
    
    // Add glow animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glow {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});
