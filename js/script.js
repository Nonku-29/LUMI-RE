document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Mark page as loaded for fade-in animation
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('loaded');
            document.body.classList.add('loaded');
        }, 1000);
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navbar.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(document.querySelector('.navbar-collapse'), {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });
    
    // Initialize Owl Carousels
    function initCarousels() {
        // Hero Slider
        if (document.querySelector('.hero-slider')) {
            $('.hero-slider').owlCarousel({
                items: 1,
                loop: true,
                nav: false,
                dots: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                smartSpeed: 1000
            });
        }
        
        // Testimonial Carousel
        if (document.querySelector('.testimonial-carousel')) {
            $('.testimonial-carousel').owlCarousel({
                loop: true,
                margin: 20,
                nav: false,
                dots: true,
                autoplay: true,
                autoplayTimeout: 5000,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 1
                    },
                    992: {
                        items: 1
                    }
                }
            });
        }
        
        // Results Carousel
        if (document.querySelector('.results-carousel')) {
            $('.results-carousel').owlCarousel({
                loop: true,
                margin: 20,
                nav: true,
                dots: false,
                autoplay: true,
                autoplayTimeout: 5000,
                navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 1
                    },
                    992: {
                        items: 1
                    }
                }
            });
        }
    }
    
    initCarousels();
    
    // Service filter functionality
    if (document.querySelector('.service-filter')) {
        const filterButtons = document.querySelectorAll('.service-filter button');
        const serviceItems = document.querySelectorAll('.service-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter services
                const filterValue = this.getAttribute('data-filter');
                serviceItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Animate numbers in stats bar
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    function initIntersectionObserver() {
        const animateElements = document.querySelectorAll('[class*="slide-in"], [class*="fade-in"], [class*="tilt-in"], .stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    
                    // Animate stats if this is the stats section
                    if (entry.target.classList.contains('stat-number')) {
                        animateStats();
                    }
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
        
        // Section title animations
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            observer.observe(title);
        });
    }
    
    initIntersectionObserver();
    
    // Contact form submission
    if (document.getElementById('contactForm')) {
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = 'Your message has been sent successfully! We will contact you soon.';
                this.appendChild(successMessage);
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Newsletter form submission
    if (document.querySelector('.newsletter-form')) {
        const newsletterForm = document.querySelector('.newsletter-form');
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.trim()) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                this.appendChild(successMessage);
                
                // Reset form
                setTimeout(() => {
                    emailInput.value = '';
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});