/**
 * ===================================
 * PREMIUM LUXURY LANDING PAGE
 * Amira Aldahab - Gold Investment Program
 * Interactive JavaScript Functionality
 * ===================================
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // MODAL FUNCTIONALITY
    // ===================================
    const modal = document.getElementById('applicationModal');
    const applyButtons = document.querySelectorAll('a[href="#apply"]');
    
    // Open modal when clicking any APPLY NOW button
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input field after animation
        setTimeout(() => {
            const firstNameInput = document.getElementById('firstName');
            if (firstNameInput) {
                firstNameInput.focus();
            }
        }, 300);
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        const form = document.getElementById('apply-form');
        if (form) {
            form.reset();
        }
        
        // Clear any error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    }
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Close modal on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // ===================================
    // SMOOTH SCROLLING
    // ===================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#apply"])');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===================================
    // SCROLL REVEAL ANIMATIONS
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(
        '.trust-item, .step-card, .testimonial-card, .social-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===================================
    // PARALLAX EFFECT FOR HERO
    // ===================================
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection && heroImage) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            const yPos = -(scrolled * parallaxSpeed);
            
            if (scrolled < heroSection.offsetHeight) {
                heroImage.style.transform = `translateY(${yPos}px) scale(1.05)`;
            }
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // ===================================
    // ENHANCED BUTTON INTERACTIONS
    // ===================================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        // Ripple effect
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple styles if not already present
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    .btn {
                        position: relative;
                        overflow: hidden;
                    }
                    .ripple {
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.6);
                        transform: scale(0);
                        animation: ripple-animation 0.6s ease-out;
                        pointer-events: none;
                    }
                    @keyframes ripple-animation {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // ===================================
    // FORM VALIDATION
    // ===================================
    const form = document.querySelector('#apply-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.remove());
            
            // Get form fields
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const country = document.getElementById('country');
            const investment = document.getElementById('investment');
            const experience = document.getElementById('experience');
            const goals = document.getElementById('goals');
            const terms = document.getElementById('terms');
            
            let isValid = true;
            
            // Validate first name
            if (!firstName || firstName.value.trim().length < 2) {
                showError(firstName, 'Please enter your first name');
                isValid = false;
            }
            
            // Validate last name
            if (!lastName || lastName.value.trim().length < 2) {
                showError(lastName, 'Please enter your last name');
                isValid = false;
            }
            
            // Validate email
            if (!email || !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate phone
            if (!phone || phone.value.trim().length < 10) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate country
            if (!country || !country.value) {
                showError(country, 'Please select your country');
                isValid = false;
            }
            
            // Validate investment range
            if (!investment || !investment.value) {
                showError(investment, 'Please select your investment range');
                isValid = false;
            }
            
            // Validate experience
            if (!experience || !experience.value) {
                showError(experience, 'Please select your experience level');
                isValid = false;
            }
            
            // Validate goals
            if (!goals || goals.value.trim().length < 20) {
                showError(goals, 'Please provide more details about your investment goals (minimum 20 characters)');
                isValid = false;
            }
            
            // Validate terms acceptance
            if (!terms || !terms.checked) {
                showError(terms, 'You must agree to the terms and conditions');
                isValid = false;
            }
            
            if (isValid) {
                // Collect form data
                const formData = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    phone: phone.value,
                    country: country.value,
                    investment: investment.value,
                    experience: experience.value,
                    goals: goals.value,
                    referral: document.getElementById('referral').value,
                    newsletter: document.getElementById('newsletter').checked
                };
                
                // Show success message and close modal
                showSuccessMessage('Application submitted successfully! We will contact you within 24-48 hours.');
                
                // Log form data (in production, this would be sent to a server)
                console.log('Application submitted:', formData);
                
                // Reset form and close modal after delay
                setTimeout(() => {
                    this.reset();
                    closeModal();
                }, 2000);
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(field, message) {
        // Remove any existing error for this field
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ff4444;
            font-size: 14px;
            margin-top: 8px;
            font-weight: 500;
            animation: fadeIn 0.3s ease;
        `;
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#ff4444';
        field.style.backgroundColor = 'rgba(255, 68, 68, 0.05)';
        
        // Remove error after 5 seconds or on field focus
        const removeError = () => {
            errorDiv.remove();
            field.style.borderColor = '';
            field.style.backgroundColor = '';
        };
        
        setTimeout(removeError, 5000);
        
        field.addEventListener('focus', removeError, { once: true });
    }
    
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #D4AF37 0%, #F0D264 100%);
            color: #0A0A0A;
            padding: 16px 24px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 600;
            box-shadow: 0 8px 32px rgba(212, 175, 55, 0.4);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            successDiv.style.transform = 'translateX(100%)';
            setTimeout(() => successDiv.remove(), 300);
        }, 4000);
    }
    
    // ===================================
    // LAZY LOADING FOR IMAGES
    // ===================================
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('loading');
        imageObserver.observe(img);
    });
    
    // Add image loading styles
    if (!document.querySelector('#image-loading-styles')) {
        const style = document.createElement('style');
        style.id = 'image-loading-styles';
        style.textContent = `
            img.loading {
                opacity: 0;
                transition: opacity 0.6s ease;
            }
            img.loaded {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===================================
    // STICKY HEADER ON SCROLL
    // ===================================
    const header = document.querySelector('header');
    let lastScrollY = 0;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.position = 'sticky';
            header.style.top = '0';
            header.style.zIndex = '1000';
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = '';
            header.style.backdropFilter = '';
            header.style.position = '';
            header.style.top = '';
            header.style.zIndex = '';
            header.style.boxShadow = '';
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(updateHeader);
    });
    
    // ===================================
    // TYPING EFFECT FOR HERO HEADING (Optional)
    // ===================================
    const heroHeading = document.querySelector('.hero h1');
    if (heroHeading && window.innerWidth > 768) { // Only on desktop
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        heroHeading.style.borderRight = '3px solid #D4AF37';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                heroHeading.style.borderRight = 'none';
            }
        }
        
        // Start typing effect after page load
        setTimeout(typeWriter, 500);
    }
    
    // ===================================
    // PERFORMANCE OPTIMIZATION
    // ===================================
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize resize events
    const optimizedResize = debounce(() => {
        // Handle resize-based adjustments here
    }, 250);
    
    window.addEventListener('resize', optimizedResize);
    
    // ===================================
    // ERROR HANDLING
    // ===================================
    window.addEventListener('error', function(e) {
        console.log('JavaScript error:', e.error);
        // Could send to analytics service here
    });
    
    // ===================================
    // PAGE LOAD PERFORMANCE TRACKING
    // ===================================
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Track performance metrics
        if (window.gtag) {
            gtag('event', 'page_load_time', {
                value: Math.round(loadTime)
            });
        }
        
        // Initialize animations after load
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    });
    
    // ===================================
    // ACCESSIBILITY ENHANCEMENTS
    // ===================================
    // Add keyboard navigation for modal
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
    
    // Add ARIA labels for better screen reader support
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.setAttribute('aria-label', 'Close modal');
    }
    
    console.log('🚀 Premium Amira Aldahab landing page loaded successfully!');
});
