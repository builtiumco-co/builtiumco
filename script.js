// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        // Close mobile nav if open
        closeMobileNav();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile nav toggle
const hamburger = document.getElementById('nav-hamburger');
const navLinksEl = document.getElementById('nav-links');
function closeMobileNav() {
    if (hamburger && navLinksEl) {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinksEl.classList.remove('is-open');
    }
}
if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinksEl.classList.toggle('is-open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    navLinksEl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
}
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileNav();
});


// Auto-update year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Reveal Line Animations
const revealLines = document.querySelectorAll('.reveal-line');
if (revealLines.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
                setTimeout(() => {
                    entry.target.classList.add('in');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealLines.forEach(line => revealObserver.observe(line));
}

// Stat Counter Animation (0+ to 50+)
const stats = document.querySelectorAll('.stat-number');
if (stats.length > 0) {
    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetEl = entry.target;
                const targetVal = parseInt(targetEl.getAttribute('data-target') || '0', 10);
                let currentVal = 0;
                // Count up to targetVal within 1.5 seconds (1500ms)
                const duration = 1500;
                const steps = Math.min(targetVal, 50); // cap steps to avoid extreme fast intervals
                const increment = Math.ceil(targetVal / steps);
                const stepTime = Math.floor(duration / steps);

                const countInterval = setInterval(() => {
                    currentVal += increment;
                    if (currentVal >= targetVal) {
                        targetEl.textContent = targetVal + '+';
                        clearInterval(countInterval);
                    } else {
                        targetEl.textContent = currentVal + '+';
                    }
                }, stepTime);

                observer.unobserve(targetEl);
            }
        });
    }, { threshold: 0.15 });

    stats.forEach(stat => statObserver.observe(stat));
}

// Scorecard Progress Bar Animation
const bars = document.querySelectorAll('.bar');
if (bars.length > 0) {
    const barObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fillEl = entry.target.querySelector('.bar-fill');
                const targetValue = entry.target.getAttribute('data-value');
                if (fillEl && targetValue) {
                    // Small delay to let viewport transition feel smooth
                    setTimeout(() => {
                        fillEl.style.width = targetValue + '%';
                        // After the bar finishes expanding, add shimmer glow animation
                        setTimeout(() => fillEl.classList.add('animated'), 2000);
                    }, 100);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    bars.forEach(bar => barObserver.observe(bar));
}