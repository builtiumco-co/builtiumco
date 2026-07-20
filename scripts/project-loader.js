document.addEventListener('DOMContentLoaded', async () => {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return; // Not on a page with projects grid

    let projects = [];
    try {
        const response = await fetch('projects.json');
        if (!response.ok) throw new Error('Failed to load projects data');
        projects = await response.json();
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
        return;
    }

    const modal = document.getElementById('portfolio-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalContent = document.getElementById('modal-content');
    const modalPrevBtn = document.getElementById('modal-prev-btn');
    const modalNextBtn = document.getElementById('modal-next-btn');
    let currentProjectId = null;

    // --- PRE-RENDER ALL MODALS FOR SEO & ACCESSIBILITY ---
    if (modalContent) {
        modalContent.innerHTML = '';
        projects.forEach(project => {
            let metricsHTML = '';
            if (project.metrics && project.metrics.length > 0) {
                metricsHTML = `
                <section class="project-section project-results">
                    <div class="container project-results-container">
                        <h2 class="project-section-title">The Results</h2>
                        <div class="results-grid">
                            ${project.metrics.map(m => `
                                <div class="result-item">
                                    <div class="result-value">${m.value}</div>
                                    <div class="result-label">${m.label}</div>
                                </div>
                            `).join('')}
                        </div>
                        ${project.client_quote ? `
                        <div class="client-quote-block">
                            <div class="client-quote">"${project.client_quote}"</div>
                            <div class="client-author">— ${project.client_role || project.client_name}</div>
                        </div>
                        ` : ''}
                        <div class="section-divider"></div>
                    </div>
                </section>`;
            }

            let strategyPointsHTML = '';
            if (project.strategy_points && project.strategy_points.length > 0) {
                strategyPointsHTML = `<ul class="project-strategy-points">
                    ${project.strategy_points.map(p => `<li>${p}</li>`).join('')}
                </ul>`;
            }

            const html = `
                <div class="project-case-study">
                    <section class="project-hero">
                        <div class="container project-hero-container">
                            <div class="project-hero-image-wrapper">
                                <img src="projects/${project.category}/${project.id}/hero.webp" alt="${project.project_name} Hero" onerror="this.onerror=null; this.src='projects/${project.category}/${project.id}/hero.png'; this.onerror=function(){this.parentElement.style.display='none'};">
                            </div>
                            <div class="project-hero-content">
                                <h1 class="project-hero-title">${project.project_name}</h1>
                                <div class="project-hero-tagline">${project.project_tagline}</div>
                                ${project.key_metric ? `<div class="project-hero-metric">${project.key_metric}</div>` : ''}
                            </div>
                        </div>
                    </section>

                    <section class="project-section project-problem">
                        <div class="container project-problem-container">
                            <h2 class="project-section-title">The Problem</h2>
                            <p class="project-problem-text">${project.problem_text || 'No problem description available.'}</p>
                            <div class="section-divider"></div>
                        </div>
                    </section>

                    <section class="project-section project-strategy">
                        <div class="container project-strategy-container">
                            <h2 class="project-section-title">Our Strategy</h2>
                            <p class="project-problem-text">${project.strategy_intro || ''}</p>
                            ${strategyPointsHTML}
                            <div class="section-divider"></div>
                        </div>
                    </section>

                    <section class="project-section project-product">
                        <div class="container project-product-container">
                            <div class="project-product-images">
                                <div class="product-image-large">
                                    <picture>
                                        <source srcset="projects/${project.category}/${project.id}/homepage.webp" type="image/webp">
                                        <img src="projects/${project.category}/${project.id}/homepage.png" alt="Main view" onerror="this.parentElement.style.display='none'">
                                    </picture>
                                </div>
                                <div class="product-image-row">
                                    <div class="product-column-primary">
                                        <div class="product-image-secondary">
                                            <picture>
                                                <source srcset="projects/${project.category}/${project.id}/service.webp" type="image/webp">
                                                <img src="projects/${project.category}/${project.id}/service.png" alt="Detail view" onerror="this.onerror=null; this.src='projects/${project.category}/${project.id}/service.webp'; this.onerror=function(){this.parentElement.style.display='none'};">
                                            </picture>
                                        </div>
                                        ${project.product_description ? `
                                        <div class="product-description-box">
                                            <h3 class="product-description-title">The Solution</h3>
                                            <p class="product-description-text">${project.product_description}</p>
                                        </div>
                                        ` : ''}
                                    </div>
                                    <div class="product-image-secondary">
                                        <picture>
                                            <source srcset="projects/${project.category}/${project.id}/mobile.webp" type="image/webp">
                                            <img src="projects/${project.category}/${project.id}/mobile.png" alt="Mobile view" onerror="this.parentElement.style.display='none'">
                                        </picture>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    ${metricsHTML}
                    
                    <section class="project-cta-section">
                        <div class="cta-center">
                            <h2>Ready for results like this?</h2>
                            <button class="cta-button" onclick="closeProjectModal(); location.href='/#contact'">Start a Project &rarr;</button>
                        </div>
                    </section>
                </div>
            `;

            const wrapper = document.createElement('div');
            wrapper.id = `project-case-${project.id}`;
            wrapper.className = 'project-case-wrapper';
            wrapper.style.display = 'none';
            wrapper.innerHTML = html;
            modalContent.appendChild(wrapper);
        });
    }

    // --- GRID RENDERING LOGIC ---
    const filterContainer = document.getElementById('category-filters');

    function renderGrid(selectedCategory) {
        projectsGrid.innerHTML = '';
        
        let filtered = projects;
        if (filterContainer) {
            // We are on the Work page, filter by category if not "All Projects"
            if (selectedCategory !== "All Projects") {
                filtered = projects.filter(p => p.category === selectedCategory);
            }
        } else {
            // We are on the Homepage, show 3 websites + 1 branding = 4 projects max
            const websites = projects.filter(p => p.category === 'Websites').slice(0, 3);
            const branding = projects.filter(p => p.category === 'Branding').slice(0, 1);
            filtered = [...websites, ...branding];
        }

        if (filtered.length === 0) {
            projectsGrid.innerHTML = `
                <div class="no-projects-message" style="grid-column: 1 / -1; text-align: center; padding: 60px 0; color: rgba(0,0,0,0.4); font-family: 'Space Grotesk', sans-serif;">
                    No projects in this category yet. Coming soon!
                </div>`;
            return;
        }

        filtered.forEach((project, index) => {
            const delay = 0.2 + (index * 0.1); 
            const card = document.createElement('article');
            card.className = 'project-card';
            card.style.animationDelay = `${delay}s`;

            const tagsHTML = project.tags ? project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('') : '';

            card.innerHTML = `
                <div class="project-link-wrapper" data-project-id="${project.id}" onclick="openProjectModal('${project.id}')" style="cursor:pointer; text-decoration:none; color:inherit;">
                    <div class="project-image-container">
                        <img src="projects/${project.category}/${project.id}/hero.webp" alt="${project.project_name} Project Showcase" class="project-image" onerror="this.onerror=null; this.src='projects/${project.category}/${project.id}/hero.png'; this.onerror=function(){this.style.display='none'};">
                    </div>
                    <div class="project-info" style="margin-top: 24px;">
                        <span class="project-category-badge" style="font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; color: var(--brand); letter-spacing: 0.1em; display: block; margin-bottom: 8px;">${project.category}</span>
                        <h3 class="project-title" style="margin-top: 0; margin-bottom: 8px; font-size: 20px; font-weight: 600;">${project.project_name}</h3>
                        <div class="project-tags" style="margin-bottom: 12px;">${tagsHTML}</div>
                        <p class="project-description">${project.short_description}</p>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }

    // --- SETUP CATEGORY FILTER BUTTONS (IF ON WORK PAGE) ---
    if (filterContainer) {
        const categories = ["All Projects", "Websites", "Branding", "Custom Apps", "Launch Strategy"];
        filterContainer.innerHTML = categories.map((cat, i) => `
            <button class="filter-btn${i === 0 ? ' active' : ''}" data-category="${cat}">
                ${cat}
            </button>
        `).join('');

        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const selectedCategory = this.getAttribute('data-category');
                renderGrid(selectedCategory);
            });
        });
    }

    // Initial render
    renderGrid("All Projects");

    // --- MODAL CONTROL LOGIC ---
    if (!modal) return;

    window.openProjectModal = (projectId) => {
        const visibleCards = Array.from(projectsGrid.querySelectorAll('.project-link-wrapper'));
        const visibleIds = visibleCards.map(card => card.getAttribute('data-project-id'));
        
        const currentIndex = visibleIds.indexOf(projectId);
        if (currentIndex === -1) return;
        currentProjectId = projectId;

        // Set up Prev/Next buttons
        if (currentIndex > 0) {
            modalPrevBtn.disabled = false;
            modalPrevBtn.onclick = () => openProjectModal(visibleIds[currentIndex - 1]);
        } else {
            modalPrevBtn.disabled = true;
            modalPrevBtn.onclick = null;
        }

        if (currentIndex < visibleIds.length - 1) {
            modalNextBtn.disabled = false;
            modalNextBtn.onclick = () => openProjectModal(visibleIds[currentIndex + 1]);
        } else {
            modalNextBtn.disabled = true;
            modalNextBtn.onclick = null;
        }

        const wrappers = modalContent.querySelectorAll('.project-case-wrapper');
        wrappers.forEach(w => w.style.display = 'none');
        
        const activeWrapper = document.getElementById(`project-case-${projectId}`);
        if(activeWrapper) activeWrapper.style.display = 'block';

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalContent.scrollTop = 0;
    };

    window.closeProjectModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentProjectId = null;
        setTimeout(() => {
            const wrappers = modalContent.querySelectorAll('.project-case-wrapper');
            wrappers.forEach(w => w.style.display = 'none');
        }, 300);
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
});
