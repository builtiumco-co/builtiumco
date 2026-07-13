// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default to control the flow

        const submitBtn = this.querySelector('.form-submit');
        const successMessage = document.getElementById('successMessage');
        const originalText = submitBtn.textContent;

        // 1. Loading State
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // 2. Collect form data and send to Netlify
        const formData = new FormData(this);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
            .then(() => {
                // 3. Show Success Message
                if (successMessage) {
                    successMessage.classList.add('active');
                }

                // 4. Reset Form & Button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();

                // 5. Hide Overlay after delay
                setTimeout(() => {
                    if (successMessage) {
                        successMessage.classList.remove('active');
                    }
                }, 2500);
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const body = document.body;

if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        body.classList.toggle('nav-open');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        body.classList.remove('nav-open');
    });
});