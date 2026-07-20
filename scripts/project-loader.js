document.addEventListener('DOMContentLoaded', async () => {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return; // Not on the portfolio page

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

    // --- HOME PAGE PORTFOLIO GRID & PRE-RENDER MODALS ---
    projectsGrid.innerHTML = ''; 
    if(modalContent) modalContent.innerHTML = ''; // Setup for pre-rendering

    projects.forEach((project, index) => {
        const delay = 0.2 + (index * 0.2); 
        const card = document.createElement('article');
        card.className = 'project-card';
        card.style.animationDelay = `${delay}s`;

        const tagsHTML = project.tags ? project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('') : '';

        card.innerHTML = `
            <div class="project-link-wrapper" onclick="openProjectModal('${project.id}')" style="cursor:pointer; text-decoration:none; color:inherit;">
                <div class="project-image-container">
                    <img src="projects/${project.id}/hero.webp" alt="${project.project_name} Project Showcase" class="project-image" onerror="this.onerror=null; this.src='projects/${project.id}/hero.png'; this.onerror=function(){this.style.display='none'};">
                </div>
                <div class="project-info" style="margin-top: 24px;">
                    <h3 class="project-title">${project.project_name}</h3>
                    <div class="project-tags">${tagsHTML}</div>
                    <p class="project-description">${project.short_description}</p>
                </div>
            </div>
        `;
        projectsGrid.appendChild(card);

        // Pre-generate case study for SEO so Googlebot indexes the words
        if (!modalContent) return;

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
                            <img src="projects/${project.id}/hero.webp" alt="${project.project_name} Hero" onerror="this.onerror=null; this.src='projects/${project.id}/hero.png'; this.onerror=function(){this.parentElement.style.display='none'};">
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
                                    <source srcset="projects/${project.id}/homepage.webp" type="image/webp">
                                    <img src="projects/${project.id}/homepage.png" alt="Homepage view" onerror="this.parentElement.style.display='none'">
                                </picture>
                            </div>
                            <div class="product-image-row">
                                <div class="product-column-primary">
                                    <div class="product-image-secondary">
                                        <picture>
                                            <source srcset="projects/${project.id}/service.webp" type="image/webp">
                                            <img src="projects/${project.id}/service.png" alt="Feature view" onerror="this.onerror=null; this.src='projects/${project.id}/service.webp'; this.onerror=function(){this.parentElement.style.display='none'};">
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
                                        <source srcset="projects/${project.id}/mobile.webp" type="image/webp">
                                        <img src="projects/${project.id}/mobile.png" alt="Mobile view" onerror="this.parentElement.style.display='none'">
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
                        <button class="cta-button" onclick="closeProjectModal(); location.href='#contact'">Start a Project &rarr;</button>
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

    if (!modal) return;

    window.openProjectModal = (projectId) => {
        const projectIndex = projects.findIndex(p => p.id === projectId);
        if (projectIndex === -1) return;
        currentProjectId = projectId;
        const project = projects[projectIndex];

        if (projectIndex > 0) {
            modalPrevBtn.disabled = false;
            modalPrevBtn.onclick = () => openProjectModal(projects[projectIndex - 1].id);
        } else {
            modalPrevBtn.disabled = true;
            modalPrevBtn.onclick = null;
        }

        if (projectIndex < projects.length - 1) {
            modalNextBtn.disabled = false;
            modalNextBtn.onclick = () => openProjectModal(projects[projectIndex + 1].id);
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
