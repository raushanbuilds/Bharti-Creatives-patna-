// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initCountUp();
    initPortfolioFilter();
    initContactForm();
    initBackToTop();
    initScrollSpy();
});

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.getElementById('navbarMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================

function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// ANIMATIONS WITH AOS
// ============================================

function initAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// ============================================
// COUNTER ANIMATION
// ============================================

function initCountUp() {
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    if (stats.length > 0) {
        observer.observe(stats[0].closest('.stats-section'));
    }
}

function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + (target > 100 ? '+' : '');
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target + (target > 100 ? '+' : '');
            }
        };

        updateCount();
    });
}

// ============================================
// PORTFOLIO FILTER
// ============================================

function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            const filter = this.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const projectType = document.getElementById('project_type').value;
            const message = document.getElementById('message').value;

            // Format phone number for WhatsApp
            let formattedPhone = phone.replace(/\D/g, '');
            if (!formattedPhone.startsWith('91')) {
                formattedPhone = '91' + formattedPhone;
            }

            // Create WhatsApp message
            const whatsappMessage = `Hi, I'm ${name}. I'm interested in ${projectType} interior design services. Email: ${email}. Phone: ${phone}. Details: ${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');

            // Reset form
            form.reset();
        });
    }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// SCROLL SPY
// ============================================

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// MOBILE MENU CLOSE ON OUTSIDE CLICK
// ============================================

document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar-container');
    const navbarMenu = document.getElementById('navbarMenu');
    const hamburger = document.getElementById('hamburger');

    if (!navbar.contains(event.target) && navbarMenu.classList.contains('active')) {
        navbarMenu.classList.remove('active');
    }
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', function(event) {
    // Close mobile menu on Escape
    if (event.key === 'Escape') {
        const navbarMenu = document.getElementById('navbarMenu');
        if (navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
        }
    }
});

// ============================================
// FORM VALIDATION
// ============================================

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff6b6b';
        } else {
            input.style.borderColor = '';
        }
    });

    return isValid;
}

// ============================================
// SMOOTH PAGE LOAD
// ============================================

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// ============================================
// HANDLE WINDOW RESIZE
// ============================================

const handleResize = debounce(function() {
    // Reinitialize AOS on resize for responsive behavior
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, 250);

window.addEventListener('resize', handleResize);

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%cBharti Creatives Patna', 'font-size: 24px; font-weight: bold; color: #C9A84C;');
console.log('%cPremium Interior Design Services', 'font-size: 14px; color: #E8C96A;');
console.log('%cDesign that Speaks. Spaces that Inspire.', 'font-size: 12px; color: #9A9A9A;');
