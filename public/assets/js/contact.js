/**
 * @fileoverview Contact Form Functionality for Gabriel Bendix Portfolio
 * @description Handles form validation, submission, and user feedback
 * @author Gabriel Bendix
 * @version 1.0.0
 * @since 2025
 */

//=============================================================================
// CONTACT FORM MANAGEMENT
//=============================================================================

/**
 * Contact Form Functionality
 * Handles form submission, validation, and API communication
 */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showFormStatus('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            showFormStatus('Sending message...', 'loading');
            
            // Send to backend API
            try {
                // Determine API URL - works for both local dev and production
                const apiUrl = `${window.location.origin}/api/contact`;
                console.log('🚀 Sending request to:', apiUrl);
                console.log('📦 Request data:', { name, email, subject, messageLength: message.length });
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    mode: 'cors',
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        subject: subject,
                        message: message,
                        website: formData.get('website') || '' // Honeypot field
                    })
                });

                // Debug: log the response details
                console.log('Response status:', response.status);
                console.log('Response headers:', response.headers);
                
                // Get the raw text first to see what we're actually getting
                const responseText = await response.text();
                console.log('Raw response:', responseText);
                
                // Try to parse as JSON
                let data;
                try {
                    data = JSON.parse(responseText);
                } catch (parseError) {
                    console.error('JSON parse error:', parseError);
                    console.error('Response was:', responseText);
                    throw new Error('Server returned invalid JSON: ' + responseText.substring(0, 100));
                }

                if (response.ok && data.ok) {
                    showFormStatus(data.message || 'Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    // Handle specific error types
                    let errorMessage = 'Failed to send message. Please try again.';
                    
                    if (data.error === 'rate_limited') {
                        errorMessage = 'Too many requests. Please wait before sending another message.';
                    } else if (data.error === 'validation_failed') {
                        errorMessage = 'Please check your input and try again.';
                    } else if (data.message) {
                        errorMessage = data.message;
                    }
                    
                    showFormStatus(errorMessage, 'error');
                }
            } catch (error) {
                console.error('Contact form error:', error);
                showFormStatus('Network error. Please check your connection and try again.', 'error');
            }
        });
    }
    
    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
        
        // Hide status after 5 seconds for success/error messages
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Form field animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Add CSS for focused state
    const style = document.createElement('style');
    style.textContent = `
        .form-group {
            position: relative;
            transition: all 0.3s ease;
        }
        
        .form-group.focused label {
            color: #4ade80;
            transform: translateY(-2px);
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            border-color: #4ade80;
            box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
        }
    `;
    document.head.appendChild(style);
});

// Social link interactions
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // You can add actual navigation here
            const platform = this.querySelector('span').textContent;
            console.log(`Social link clicked: ${platform}`);
            
            // For now, just show an alert (replace with actual links)
            alert(`This would open your ${platform} profile. Please update the href attribute with your actual profile URL.`);
        });
    });
});

// Contact item hover effects removed to prevent resume button interaction

// FAQ section interactions (if you want to make them expandable)
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');
            
            // Add smooth transition
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Add CSS for FAQ interactions
    const style = document.createElement('style');
    style.textContent = `
        .faq-item {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .faq-item:hover {
            transform: translateY(-2px);
            border-color: rgba(74, 222, 128, 0.3);
        }
        
        .faq-item.active {
            border-color: rgba(74, 222, 128, 0.5);
            background: rgba(74, 222, 128, 0.05);
        }
    `;
    document.head.appendChild(style);
});

// Availability status animation
document.addEventListener('DOMContentLoaded', function() {
    const statusDot = document.querySelector('.status-dot');
    
    if (statusDot) {
        // Add pulsing animation
        statusDot.style.animation = 'pulse 2s ease-in-out infinite';
    }
});

// Form validation real-time feedback
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const isValid = isValidEmail(this.value);
            this.style.borderColor = isValid ? '#4ade80' : '#ef4444';
        });
    }
    
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            const isValid = this.value.length >= 2;
            this.style.borderColor = isValid ? '#4ade80' : '#ef4444';
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Email functionality removed since email is no longer displayed
