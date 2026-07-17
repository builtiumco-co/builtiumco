document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    const quizData = [
        // Category 1: BRAND IDENTITY & VISUAL SYSTEMS (3 questions, 75 points max)
        {
            category: "BRAND",
            categoryMaxPoints: 75,
            question: "Do you have a professional logo?",
            options: [
                { text: "Yes, professionally designed", points: 25, type: "positive", fact: "Professional logo" },
                { text: "Yes, but DIY/basic", points: 12, type: "partial", fact: "Basic logo" },
                { text: "No logo yet", points: 0, type: "negative", fact: "Missing: Professional logo" }
            ]
        },
        {
            category: "BRAND",
            question: "Is your brand identity consistent across all platforms?",
            options: [
                { text: "Completely consistent (colors, fonts, messaging)", points: 25, type: "positive", fact: "Consistent branding" },
                { text: "Mostly consistent", points: 12, type: "partial", fact: "Mostly consistent branding" },
                { text: "Not consistent/all over the place", points: 0, type: "negative", fact: "Missing: Consistent branding" }
            ]
        },
        {
            category: "BRAND",
            question: "Do you have documented brand guidelines?",
            options: [
                { text: "Yes, detailed guidelines", points: 25, type: "positive", fact: "Documented brand guidelines" },
                { text: "Basic/informal guidelines", points: 12, type: "partial", fact: "Informal brand guidelines" },
                { text: "No guidelines", points: 0, type: "negative", fact: "Missing: Documented brand guidelines" }
            ]
        },
        // Category 2: WEBSITE DESIGN & DEVELOPMENT (4 questions, 100 points max)
        {
            category: "WEBSITE",
            categoryMaxPoints: 100,
            question: "Do you have a professional website?",
            options: [
                { text: "Yes, modern and professional", points: 25, type: "positive", fact: "Professional website" },
                { text: "Yes, but outdated/needs work", points: 12, type: "partial", fact: "Outdated website" },
                { text: "No website", points: 0, type: "negative", fact: "Missing: Professional website" }
            ]
        },
        {
            category: "WEBSITE",
            question: "Is your website mobile-responsive?",
            options: [
                { text: "Fully responsive on all devices", points: 25, type: "positive", fact: "Mobile-responsive site" },
                { text: "Works on mobile but not perfect", points: 12, type: "partial", fact: "Partially mobile-responsive" },
                { text: "No website yet", points: 0, type: "negative", fact: "Missing: Mobile-responsive site" }
            ]
        },
        {
            category: "WEBSITE",
            question: "How's your website's load speed?",
            options: [
                { text: "Very fast (under 2 seconds)", points: 25, type: "positive", fact: "Fast load times" },
                { text: "Acceptable (2-4 seconds)", points: 12, type: "partial", fact: "Acceptable load times" },
                { text: "No website yet", points: 0, type: "negative", fact: "Missing: Fast load times" }
            ]
        },
        {
            category: "WEBSITE",
            question: "Does your website have clear CTAs (call-to-actions)?",
            options: [
                { text: "Yes, clear and prominent", points: 25, type: "positive", fact: "Clear CTAs" },
                { text: "Yes, but could be more visible", points: 12, type: "partial", fact: "Visible but weak CTAs" },
                { text: "No website yet", points: 0, type: "negative", fact: "Missing: Clear CTAs" }
            ]
        },
        // Category 3: DIGITAL LAUNCH SUPPORT & STRUCTURE (5 questions, 125 points max)
        {
            category: "LAUNCH",
            categoryMaxPoints: 125,
            question: "Do you have active social media presence?",
            options: [
                { text: "Multiple platforms, regular posts", points: 25, type: "positive", fact: "Social media presence" },
                { text: "1-2 platforms, occasional posts", points: 12, type: "partial", fact: "Basic social media presence" },
                { text: "No social media", points: 0, type: "negative", fact: "Missing: Social media presence" }
            ]
        },
        {
            category: "LAUNCH",
            question: "Do you have professional email setup?",
            options: [
                { text: "Custom domain email (you@yourdomain.com)", points: 25, type: "positive", fact: "Professional email setup" },
                { text: "Free email (Gmail, Yahoo)", points: 12, type: "partial", fact: "Free email address" },
                { text: "No dedicated email", points: 0, type: "negative", fact: "Missing: Professional email setup" }
            ]
        },
        {
            category: "LAUNCH",
            question: "Are you tracking website analytics?",
            options: [
                { text: "Yes, Google Analytics set up and monitored", points: 25, type: "positive", fact: "Analytics setup and tracking" },
                { text: "Yes, but don't regularly check", points: 12, type: "partial", fact: "Basic analytics tracking" },
                { text: "No analytics tracking", points: 0, type: "negative", fact: "Missing: Analytics setup" }
            ]
        },
        {
            category: "LAUNCH",
            question: "Do you have a lead capture system?",
            options: [
                { text: "Yes, contact form/email list/CRM", points: 25, type: "positive", fact: "Lead capture system" },
                { text: "Yes, but basic (email only)", points: 12, type: "partial", fact: "Basic lead capture" },
                { text: "No system", points: 0, type: "negative", fact: "Missing: Lead capture system" }
            ]
        },
        {
            category: "LAUNCH",
            question: "How prepared are you for a digital launch?",
            options: [
                { text: "Very prepared (have strategy, timeline, assets)", points: 25, type: "positive", fact: "Complete launch strategy" },
                { text: "Somewhat prepared (have some elements)", points: 12, type: "partial", fact: "Partial launch strategy" },
                { text: "Not prepared", points: 0, type: "negative", fact: "Missing: Launch strategy" }
            ]
        }
    ];

    // --- State ---
    let userData = { name: "", type: "" };
    let currentQuestionIndex = 0;
    let answers = new Array(quizData.length).fill(null);
    let selectedOptionIndex = null;

    // --- DOM Elements ---
    const quizIntro = document.getElementById('quiz-intro');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizResults = document.getElementById('quiz-results');

    const introForm = document.getElementById('quiz-intro-form');

    // Question elements
    const currentQNum = document.getElementById('current-q-num');
    const qCategoryTag = document.getElementById('q-category-tag');
    const qText = document.getElementById('q-text');
    const qOptions = document.getElementById('q-options');
    const progressBar = document.getElementById('quiz-progress-bar');

    // Buttons
    const backBtn = document.getElementById('quiz-back-btn');
    const nextBtn = document.getElementById('quiz-next-btn');

    // --- Initialization ---
    if (!introForm) return; // Guard if not on the page

    introForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const businessName = document.getElementById('businessName').value.trim();
        window.location.href = `audit/?businessName=${encodeURIComponent(businessName)}`;
    });

    backBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        } else {
            showStep(quizQuestions, quizIntro);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (selectedOptionIndex !== null) {
            answers[currentQuestionIndex] = quizData[currentQuestionIndex].options[selectedOptionIndex];

            if (currentQuestionIndex < quizData.length - 1) {
                currentQuestionIndex++;
                loadQuestion(currentQuestionIndex);
            } else {
                finishQuiz();
            }
        }
    });

    function showStep(hideEl, showEl) {
        hideEl.classList.remove('active');
        showEl.classList.add('active');
    }

    function loadQuestion(index) {
        const q = quizData[index];
        currentQNum.textContent = index + 1;

        // Progress bar logic
        progressBar.style.width = `${((index) / quizData.length) * 100}%`;

        qCategoryTag.textContent = q.category;
        qCategoryTag.className = 'quiz-category-tag ' + q.category.toLowerCase();

        qText.textContent = q.question;

        // Reset selected option
        selectedOptionIndex = answers[index] ? quizData[index].options.findIndex(o => o.text === answers[index].text) : null;

        qOptions.innerHTML = '';
        q.options.forEach((opt, i) => {
            const card = document.createElement('div');
            card.className = `quiz-option-card ${selectedOptionIndex === i ? 'selected' : ''}`;
            card.innerHTML = `
                <div class="quiz-option-radio"></div>
                <div class="quiz-option-text">${opt.text}</div>
            `;
            card.addEventListener('click', () => {
                document.querySelectorAll('.quiz-option-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedOptionIndex = i;
                nextBtn.disabled = false;
            });
            qOptions.appendChild(card);
        });

        // Update nav buttons
        backBtn.disabled = false;

        nextBtn.textContent = index === quizData.length - 1 ? 'See Results' : 'Next';
        nextBtn.disabled = selectedOptionIndex === null;
    }

    function finishQuiz() {
        showStep(quizQuestions, quizResults);
        progressBar.style.width = '100%';
        calculateAndRenderResults();
    }

    function calculateAndRenderResults() {
        let scores = { BRAND: 0, WEBSITE: 0, LAUNCH: 0 };
        let pointsPossible = { BRAND: 75, WEBSITE: 100, LAUNCH: 125 };

        answers.forEach((ans, idx) => {
            const category = quizData[idx].category;
            scores[category] += ans.points;
        });

        const totalScore = scores.BRAND + scores.WEBSITE + scores.LAUNCH;
        const totalPossible = 300;
        const percentage = Math.round((totalScore / totalPossible) * 100);

        // Render Overall
        document.getElementById('final-score-number').textContent = `${percentage}%`;
        document.getElementById('score-description').textContent = `Based on ${userData.name}`;

        const msgEl = document.getElementById('score-message');
        const recEl = document.getElementById('score-recommendation');
        const interpContainer = msgEl.parentElement;

        if (percentage >= 85) {
            msgEl.textContent = "You're Digital-Ready";
            recEl.textContent = "Great foundation! Let's optimize and scale what you have.";
            interpContainer.style.borderLeftColor = "#2ecc71";
            document.querySelector('.score-circle').style.borderColor = "#2ecc71";
            document.getElementById('final-score-number').style.color = "#2ecc71";
        } else if (percentage >= 70) {
            msgEl.textContent = "You're Getting There";
            recEl.textContent = "You have the basics down. Time to level up areas where you're struggling.";
            interpContainer.style.borderLeftColor = "#3a7bff";
            document.querySelector('.score-circle').style.borderColor = "#3a7bff";
            document.getElementById('final-score-number').style.color = "#3a7bff";
        } else if (percentage >= 50) {
            msgEl.textContent = "Room for Growth";
            recEl.textContent = "You're missing critical elements. Let's build your complete digital foundation.";
            interpContainer.style.borderLeftColor = "#f39c12";
            document.querySelector('.score-circle').style.borderColor = "#f39c12";
            document.getElementById('final-score-number').style.color = "#f39c12";
        } else {
            msgEl.textContent = "Start From Scratch";
            recEl.textContent = "Your digital presence needs attention now. We specialize in building from zero to hero.";
            interpContainer.style.borderLeftColor = "#e74c3c";
            document.querySelector('.score-circle').style.borderColor = "#e74c3c";
            document.getElementById('final-score-number').style.color = "#e74c3c";
        }

        // Render Breakdown
        document.getElementById('score-brand').textContent = `${scores.BRAND} / 75`;
        document.getElementById('score-website').textContent = `${scores.WEBSITE} / 100`;
        document.getElementById('score-launch').textContent = `${scores.LAUNCH} / 125`;

        // Wait a small moment to trigger animation
        setTimeout(() => {
            document.getElementById('bar-brand').style.width = `${(scores.BRAND / 75) * 100}%`;
            document.getElementById('bar-website').style.width = `${(scores.WEBSITE / 100) * 100}%`;
            document.getElementById('bar-launch').style.width = `${(scores.LAUNCH / 125) * 100}%`;
        }, 100);

        // Render Gap Analysis
        renderGapCategory('BRAND', 'gap-brand');
        renderGapCategory('WEBSITE', 'gap-website');
        renderGapCategory('LAUNCH', 'gap-launch');
    }

    function renderGapCategory(categoryFilter, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = `<h5 class="gap-cat-title">${categoryFilter}</h5>`;

        const catQuestions = quizData.filter(q => q.category === categoryFilter);
        const catIndices = quizData.reduce((acc, q, idx) => {
            if (q.category === categoryFilter) acc.push(idx);
            return acc;
        }, []);

        catIndices.forEach(idx => {
            const ans = answers[idx];
            if (!ans) return;

            const isMissing = ans.type === 'negative';
            const iconSvg = isMissing
                ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
                : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

            const itemHTML = `
                <div class="gap-item">
                    <div class="gap-icon ${isMissing ? 'negative' : 'positive'}">${iconSvg}</div>
                    <div>${ans.fact}</div>
                </div>
            `;
            container.innerHTML += itemHTML;
        });
    }

    // Lead Form Submission
    const leadForm = document.getElementById('quiz-lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Populate hidden fields
            document.getElementById('hidden-business-name').value = userData.name;
            document.getElementById('hidden-business-type').value = userData.type;
            const scoreText = document.getElementById('final-score-number').textContent;
            document.getElementById('hidden-total-score').value = scoreText;

            const formData = new FormData(leadForm);

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then(() => {
                document.getElementById('quiz-lead-section').style.display = 'none';
                document.getElementById('quiz-success-msg').style.display = 'block';
            })
            .catch((error) => {
                console.error("Form submission error:", error);
                alert("There was an error submitting the form. Please try again.");
            });
        });
    }

    const resetBtn = document.getElementById('quiz-reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Hard reload for clean state or custom reset
            window.location.href = '#hero';
            setTimeout(() => location.reload(), 100);
        });
    }
});
