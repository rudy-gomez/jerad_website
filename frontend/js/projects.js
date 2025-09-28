/* ========================================
    MAIN SCRIPT LOGIC 
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    /* ----------------------------------------
        PAGE ELEMENTS 
       ---------------------------------------- */
    const projectsSection = document.getElementById('section1');
    const projectDetailSection = document.getElementById('section2');
    const backButton = document.getElementById('back-to-projects');
    const projectCards = document.querySelectorAll('.project-card');
    const projectHero = document.querySelector('.project-hero');
    const projectTitle = document.getElementById('project-title');
    const projectSubtitle = document.getElementById('project-subtitle');
    const projectDescriptionText = document.getElementById('project-description-text');
    const loadingSpinner = document.querySelector('.loading-spinner');


    /* ----------------------------------------
        SIMULATED PROJECT DATA 
       ---------------------------------------- */
    const projectsData = {
        'unilab': {
            title: 'UniLab',
            subtitle: 'Sistema de inscripción a laboratorios para instituciones educativas.',
            description: 'Desarrollamos un sistema integral de matrícula para laboratorios virtuales que permite a los estudiantes inscribirse en prácticas, reservar horarios y acceder a materiales educativos. La plataforma incluye un panel de administración para gestionar usuarios, horarios y recursos, garantizando una experiencia fluida y accesible desde cualquier dispositivo.',
            heroImage: 'assets/background_projects1.jpg'
        },
        'virtual-enrollment': {
            title: 'Sistema de Matrícula Virtual',
            subtitle: 'Plataforma completa de gestión de matrículas para centros educativos.',
            description: 'Un sistema robusto y escalable que digitaliza todo el proceso de matrícula, desde la inscripción y selección de cursos hasta la gestión de pagos y la comunicación con los padres. Su interfaz intuitiva reduce la carga administrativa y mejora la experiencia de usuario.',
            heroImage: 'assets/background_h.jpg'
        },
        'healthcare': {
            title: 'HealthCare App',
            subtitle: 'Aplicación móvil para la gestión de citas y seguimiento médico.',
            description: 'Una aplicación móvil que conecta a pacientes con profesionales de la salud, permitiendo agendar citas, recibir recordatorios, acceder a historiales médicos y realizar consultas virtuales. La seguridad y la privacidad de los datos son la máxima prioridad.',
            heroImage: 'assets/background_projects.jpg'
        },
        'eduplatform': {
            title: 'EduPlatform',
            subtitle: 'Plataforma de aprendizaje online (LMS) personalizable.',
            description: 'Una solución de e-learning completa que ofrece cursos interactivos, seguimiento del progreso, evaluaciones y foros de discusión. Diseñada para ser flexible y adaptarse a las necesidades de instituciones educativas y empresas.',
            heroImage: 'assets/background_h.jpg'
        },
        'smartfactory': {
            title: 'Smart Factory',
            subtitle: 'Sistema IoT para la monitorización y automatización industrial.',
            description: 'Implementación de sensores y actuadores conectados a una plataforma central para monitorizar en tiempo real la producción, predecir fallos de maquinaria y optimizar el consumo de energía en plantas industriales, impulsando la eficiencia y reduciendo costos operativos.',
            heroImage: 'assets/background_projects.jpg'
        },
        'financedashboard': {
            title: 'Finance Dashboard',
            subtitle: 'Panel de control para análisis y visualización de datos financieros.',
            description: 'Una herramienta web que consolida datos de múltiples fuentes financieras en un dashboard interactivo y fácil de entender. Permite a las empresas tomar decisiones estratégicas basadas en métricas y KPIs actualizados en tiempo real.',
            heroImage: 'assets/background_h.jpg'
        }
    };

    /* ----------------------------------------
        NAVIGATION & VIEW MANAGEMENT 
       ---------------------------------------- */
    function showProjectDetails(projectId) {
        const projectData = projectsData[projectId] || {
            title: 'Proyecto no encontrado',
            subtitle: 'La información para este proyecto no está disponible.',
            description: 'Por favor, selecciona otro proyecto de la lista.',
            heroImage: 'assets/background_projects.jpg'
        };

        projectTitle.textContent = projectData.title;
        projectSubtitle.textContent = projectData.subtitle;
        projectDescriptionText.textContent = projectData.description;
        projectHero.style.backgroundImage = `url('${projectData.heroImage}')`;

        projectsSection.style.opacity = 0;
        setTimeout(() => {
            projectsSection.style.display = 'none';
            projectDetailSection.classList.remove('hidden');
            projectDetailSection.style.opacity = 1;
            window.scrollTo(0, 0);
            initCountersForSection(projectDetailSection);
        }, 300);
    }

    function backToProjects() {
        projectDetailSection.style.opacity = 0;
        setTimeout(() => {
            projectDetailSection.classList.add('hidden');
            projectsSection.style.display = 'block';
            projectsSection.style.opacity = 1;
            window.scrollTo(0, 0);
        }, 300);
    }


    /* ----------------------------------------
        ANIMATIONS 
       ---------------------------------------- */
    function initCountersForSection(section) {
        const counters = section.querySelectorAll('.countup, .result-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-count');
                    let count = 0;
                    const updateCount = () => {
                        const increment = Math.max(1, target / 100);
                        count += increment;
                        if (count < target) {
                            counter.innerText = Math.ceil(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                    observer.unobserve(counter); // Animate only once
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }
    
    // Initial call for the main page counters
    initCountersForSection(projectsSection);


    /* ----------------------------------------
        EVENT LISTENERS 
       ---------------------------------------- */
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            if (projectId) showProjectDetails(projectId);
        });
    });

    if (backButton) {
        backButton.addEventListener('click', backToProjects);
    }


    /* ----------------------------------------
        LOADING SPINNER FUNCTIONS 
       ---------------------------------------- */
    function showLoading() {
        if (loadingSpinner) loadingSpinner.style.display = 'block';
    }

    function hideLoading() {
        if (loadingSpinner) loadingSpinner.style.display = 'none';
    }


    /* ----------------------------------------
        PROJECT FILTERING LOGIC 
       ---------------------------------------- */
    const industryFilter = document.getElementById('industry-filter');
    const techFilter = document.getElementById('tech-filter');
    const yearFilter = document.getElementById('year-filter');
    const searchInput = document.getElementById('project-search');

    function filterProjects() {
        showLoading();
        const industryValue = industryFilter.value.toLowerCase();
        const techValue = techFilter.value.toLowerCase();
        const yearValue = yearFilter.value;
        const searchValue = searchInput.value.toLowerCase();

        setTimeout(() => {
            projectCards.forEach(card => {
                const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase());
                const title = card.querySelector('h3').textContent.toLowerCase();

                const industryMatch = industryValue ? tags.includes(industryValue) : true;
                const techMatch = techValue ? tags.includes(techValue) : true;
                const yearMatch = yearValue ? tags.includes(yearValue) : true;
                const searchMatch = searchValue ? title.includes(searchValue) : true;

                if (industryMatch && techMatch && yearMatch && searchMatch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            hideLoading();
        }, 300);
    }

    let debounceTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(filterProjects, 300);
        });
    }

    [industryFilter, techFilter, yearFilter].forEach(filter => {
        if (filter) filter.addEventListener('change', filterProjects);
    });

    /* ----------------------------------------
        IMAGE MODAL LOGIC 
       ---------------------------------------- */
    document.querySelectorAll('.gallery-item, .gallery-final-item').forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img src="${imgSrc}" alt="Imagen ampliada">
                </div>
            `;
            document.body.appendChild(modal);
            setTimeout(() => modal.classList.add('show'), 10);

            const closeModal = () => {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            };

            modal.querySelector('.close').addEventListener('click', closeModal);
            modal.addEventListener('click', e => {
                if (e.target === modal) closeModal();
            });
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            const modal = document.querySelector('.image-modal.show');
            if (modal) {
                modal.querySelector('.close').click();
            }
        }
    });

    /* ----------------------------------------
        INJECTED MODAL STYLES 
       ---------------------------------------- */
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .image-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 1001; opacity: 0; transition: opacity 0.3s ease; }
        .image-modal.show { opacity: 1; }
        .modal-content { position: relative; max-width: 90%; max-height: 90%; }
        .modal-content img { display: block; max-width: 100%; max-height: 85vh; border-radius: 10px; }
        .close { position: absolute; top: -40px; right: -10px; color: white; font-size: 3rem; font-weight: bold; cursor: pointer; }
    `;
    document.head.appendChild(modalStyles);
});