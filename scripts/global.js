// Global component loading & interactivity
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load components
    await Promise.all([
        loadComponent('nav-placeholder', '/components/nav.html'),
        loadComponent('footer-placeholder', '/components/footer.html')
    ]);

    // 2. Initialize global listeners
    initializeGlobalInteractions();
});

// Helper to fetch and insert HTML component
async function loadComponent(placeholderId, url) {
    const el = document.getElementById(placeholderId);
    if (!el) return;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        el.innerHTML = await response.text();
    } catch (err) {
        console.error(err);
    }
}

// Wire up global nav events, smooth scrolling, active link highlighting
function initializeGlobalInteractions() {
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

    // Close mobile nav on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMobileNav();
    });

    // Highlight active link
    const path = window.location.pathname;
    const allLinks = document.querySelectorAll('.nav-link, .footer-nav a');
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Match exact or prefix
        if (href === path || (href === '/' && path === '/index.html') || (href !== '/' && path.startsWith(href))) {
            link.classList.add('active');
            if (link.classList.contains('nav-link') && href === '/audit') {
                link.style.color = 'var(--brand)';
            }
        }
    });

    // Smooth scrolls for same-page anchors
    document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            let href = this.getAttribute('href');
            if (href.startsWith('/#')) {
                // If on homepage, just scroll
                if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '/home.html') {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const target = document.querySelector(targetId);
                    if (target) {
                        closeMobileNav();
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            } else if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    closeMobileNav();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}
