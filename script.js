// ========================================
// PREMIUM SCROLL ANIMATIONS & INTERACTIONS
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    initHeroAnimations();
    initScrollReveal();
    initNavbarScroll();
    initParallax();
    initTiltCards();
    initCounterAnimation();
    initFAQ();
    initSmoothScroll();
    initMobileNav();
    initMagneticButtons();
    initCursorGlow();
    initRipple();
    initRetroCarousel();
    initContactForms();
});

// ---- MOBILE NAVIGATION ----
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ---- SMOOTH SCROLLING ----
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ---- HERO ENTRANCE ANIMATIONS ----
function initHeroAnimations() {
    const heroElements = [
        '.hero-tagline', '.hero-new-title', '.hero-new-content > p',
        '.hero-new-buttons', '.hero-social-proof', '.hero-new-image'
    ];
    heroElements.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, i * 150 + 200);
        }
    });
}

// ---- SCROLL REVEAL SYSTEM ----
function initScrollReveal() {
    const sections = document.querySelectorAll(
        '.section-header, .about, .about-content, .teaching-philosophy, .testimonials, .courses-section, .pricing, .contact, .contact-content, .faq, .faq-section, .results-section, .cta-section, .why-section, .sat-results, .success-stories, .comparison-section, .courses-section-v2'
    );
    sections.forEach(s => { if (!s.classList.contains('reveal')) s.classList.add('reveal'); });

    const grids = document.querySelectorAll(
        '.courses-grid-new, .courses-v2-grid, .pricing-grid, .results-grid, .testimonials-grid, .stats-bar, .features-grid, .philosophy-grid, .stories-grid, .expertise-highlights'
    );
    grids.forEach(grid => {
        grid.classList.add('stagger-children');
        Array.from(grid.children).forEach(child => child.classList.add('stagger-item'));
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children, .img-reveal').forEach(el => {
        revealObserver.observe(el);
    });
}

// ---- NAVBAR SCROLL EFFECT ----
function initNavbarScroll() {
    const nav = document.querySelector('.floating-nav');
    if (!nav) return;
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            if (scrollY > 60) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            if (scrollY > lastScroll && scrollY > 400) {
                nav.style.transform = 'translateX(-50%) translateY(-100px)';
            } else {
                nav.style.transform = 'translateX(-50%) translateY(0)';
            }
            lastScroll = scrollY;
        });
    }, { passive: true });
}

// ---- PARALLAX EFFECT ----
function initParallax() {
    const heroImage = document.querySelector('.hero-new-image');
    const heroContent = document.querySelector('.hero-new-content');
    if (!heroImage && !heroContent) return;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 800) return;
        if (heroImage) heroImage.style.transform = 'translateY(' + (scrollY * 0.08) + 'px)';
        if (heroContent) heroContent.style.transform = 'translateY(' + (scrollY * 0.03) + 'px)';
    }, { passive: true });
}

// ---- FAQ ACCORDION ----
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        question.addEventListener('click', () => {
            faqItems.forEach(other => { if (other !== item) other.classList.remove('active'); });
            item.classList.toggle('active');
        });
    });
}

// ---- 3D TILT CARD EFFECT ----
function initTiltCards() {
    const cards = document.querySelectorAll(
        '.course-card-new, .pricing-card, .result-card, .testimonial-card'
    );
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-5px)';
            card.style.transition = 'transform 0.1s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });
}

// ---- COUNTER ANIMATION ----
function initCounterAnimation() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => animateValue(counter));
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stats-bar, .hero-stats').forEach(el => {
        if (el) counterObserver.observe(el);
    });
}

function animateValue(el) {
    const text = el.textContent.trim();
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const number = parseInt(text.replace(/[^\d]/g, ''));
    if (isNaN(number)) return;

    const duration = 2000;
    const startTime = performance.now();
    el.textContent = '0' + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * number);
        el.textContent = current + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = number + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
        }
    }
    requestAnimationFrame(update);
}

// ---- MAGNETIC BUTTON HOVER ----
function initMagneticButtons() {
    document.querySelectorAll('.btn-primary, .nav-contact-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
            btn.style.transition = 'transform 0.1s ease';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });
}

// ---- CURSOR GLOW ----
function initCursorGlow() {
    const glow = document.createElement('div');
    glow.style.cssText = 'position:fixed;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(52,76,198,0.06) 0%,transparent 70%);pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:opacity 0.3s ease;opacity:0;';
    document.body.appendChild(glow);
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        glow.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
}

// ---- BUTTON RIPPLE EFFECT ----
function initRipple() {
    const style = document.createElement('style');
    style.textContent = '@keyframes rippleEffect { to { transform: scale(4); opacity: 0; } }';
    document.head.appendChild(style);

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn');
        if (!btn) return;
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;border-radius:50%;background:rgba(255,255,255,0.5);transform:scale(0);animation:rippleEffect 0.6s ease-out;pointer-events:none;';
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
}

// ---- NOTIFICATION SYSTEM ----
function showNotification(message, type) {
    type = type || 'info';
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    
    const iconMap = { 
        success: 'fa-check-circle', 
        error: 'fa-exclamation-circle', 
        info: 'fa-info-circle' 
    };
    
    const colorMap = {
        success: '#16a34a',
        error: '#ef4444',
        info: '#344CC6'
    };
    
    const color = colorMap[type] || colorMap.info;
    const icon = iconMap[type] || iconMap.info;
    
    notification.innerHTML = `
        <div style="display:flex; align-items:center; padding:16px 20px; gap:14px; font-family:'Plus Jakarta Sans', sans-serif;">
            <i class="fas ${icon}" style="color: ${color}; font-size: 1.25rem; flex-shrink: 0;"></i>
            <span style="color: #1e293b; font-size: 0.875rem; font-weight: 500; line-height: 1.5; padding-right: 10px;">${message}</span>
            <button onclick="this.closest('.notification').style.transform='translateX(400px)'; setTimeout(() => this.closest('.notification').remove(), 400)" 
                    style="background:none; border:none; font-size:22px; cursor:pointer; color:#94a3b8; margin-left:auto; display:flex; align-items:center; justify-content:center; padding: 0; transition:color 0.2s;"
                    onmouseover="this.style.color='#475569'" 
                    onmouseout="this.style.color='#94a3b8'">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        max-width: 400px;
        min-width: 280px;
        border-left: 5px solid ${color};
        box-sizing: border-box;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 50);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 400);
        }
    }, 6000);
}

// ---- CONTACT FORM HANDLER ----
function initContactForms() {
    const homeForm = document.getElementById('home-contact-form');
    const pageForm = document.getElementById('page-contact-form');

    if (homeForm) {
        setupFormSubmit(homeForm, 'Home Screen - Get in Touch');
    }
    if (pageForm) {
        setupFormSubmit(pageForm, 'Contact Page - Free Consultation');
    }
}

function setupFormSubmit(form, sourceName) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        if (!submitBtn) return;
        
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        
        // Show premium loading spinner and text
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
        
        // Gather form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        data.form_source = sourceName;
        
        // Send data to PHP backend
        fetch('send_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(res => {
            if (res.success) {
                showNotification(res.message || 'Thank you! Your message has been sent successfully.', 'success');
                form.reset();
            } else {
                showNotification(res.message || 'An error occurred while sending your message. Please try again.', 'error');
            }
        })
        .catch(error => {
            console.error('Contact Form Error:', error);
            const errorMsg = error.message || 'Failed to send message. Please check your internet connection or email us directly.';
            showNotification(errorMsg, 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
        });
    });
}

// ---- RETRO TESTIMONIAL CAROUSEL ----
function initRetroCarousel() {
    const carousel = document.getElementById('retroCarousel');
    const leftBtn = document.getElementById('retroLeft');
    const rightBtn = document.getElementById('retroRight');
    if (!carousel || !leftBtn || !rightBtn) return;

    const firstCard = carousel.querySelector('.retro-card');
    const scrollAmount = firstCard ? firstCard.offsetWidth + 20 : 300;

    function updateButtons() {
        const { scrollLeft, scrollWidth, clientWidth } = carousel;
        leftBtn.disabled = scrollLeft <= 5;
        rightBtn.disabled = scrollLeft >= scrollWidth - clientWidth - 5;
    }

    leftBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    carousel.addEventListener('scroll', updateButtons);
    updateButtons();

    // Entrance animation: stagger cards in
    const cards = carousel.querySelectorAll('.retro-card');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                cards.forEach((card, i) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 150 * i);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.2 });

    observer.observe(carousel);
}

// ---- CONSOLE BRANDING ----
console.log('%c Dr. Syed Waqas — Math Tutoring', 'color: #344CC6; font-size: 20px; font-weight: bold;');
console.log('%cMaster math from Algebra to Calculus!', 'color: #7c3aed; font-size: 14px;');

// ---- DYNAMIC VIDEO PLAYER HANDLERS ----
function playRetroVideo(card) {
    const video = card.querySelector('video');
    const placeholder = card.querySelector('.retro-video-placeholder');
    const overlay = card.querySelector('.retro-video-overlay');
    if (!video) return;
    
    // Hide standard overlay elements and show video
    video.style.opacity = '1';
    if (placeholder) placeholder.style.opacity = '0';
    if (overlay) overlay.style.opacity = '0';
    
    // Toggle system controls and play
    video.play();
    
    // Reset back to premium cover when video ends
    video.addEventListener('ended', () => {
        video.style.opacity = '0';
        if (placeholder) placeholder.style.opacity = '1';
        if (overlay) overlay.style.opacity = '1';
        video.load(); // Reload to start
    });
}

function playGridVideo(card) {
    const video = card.querySelector('video');
    const placeholder = card.querySelector('.retro-video-placeholder');
    if (!video) return;
    
    video.style.opacity = '1';
    if (placeholder) placeholder.style.opacity = '0';
    
    video.play();
    
    video.addEventListener('ended', () => {
        video.style.opacity = '0';
        if (placeholder) placeholder.style.opacity = '1';
        video.load();
    });
}
