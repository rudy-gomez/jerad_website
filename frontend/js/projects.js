/* ========================================
   SECTION 1: HEADER & FOOTER INJECTION
   ======================================== */

fetch('components/header.html')
    .then(response => {
        if (!response.ok) throw new Error(`Error loading header: ${response.statusText}`);
        return response.text();
    })
    .then(data => {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = data;
            /*
             * Sets the 'active' class on the correct navigation link based on the current page.
            */
            const navLinks = headerPlaceholder.querySelectorAll('nav a');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.href.includes('projects.html')) {
                    link.classList.add('active');
                }
            });
        }
    })
    .catch(err => console.error(err));

/*
 * Dynamically fetches and injects the footer HTML component.
 */
fetch('components/footer.html')
    .then(response => {
        if (!response.ok) throw new Error(`Error loading footer: ${response.statusText}`);
        return response.text();
    })
    .then(data => {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) footerPlaceholder.innerHTML = data;
    })
    .catch(err => console.error(err));

/* ========================================
   MAIN SCRIPT LOGIC 
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    /* ----------------------------------------
       PAGE ELEMENTS 
       ---------------------------------------- */
    /*
     * English: Caching DOM elements for better performance and easier access.
     */
    const projectsSection = document.getElementById('section1');
    const projectDetailSection = document.getElementById('section2');
    const backButton = document.getElementById('back-to-projects');
    const projectCards = document.querySelectorAll('.project-card');
    const projectHero = document.querySelector('.project-hero');
    const projectTitle = document.getElementById('project-title');
    const projectSubtitle = document.getElementById('project-subtitle');
    const loadingSpinner = document.querySelector('.loading-spinner');


    /* ----------------------------------------
       SIMULATED PROJECT DATA 
       ---------------------------------------- */
    /*
     *  An object containing data for each project. In a real application, this would come from an API.
    */
    const projectsData = {
        'unilab': {
            title: 'UniLab',
            subtitle: 'Sistema de inscripción a laboratorios para instituciones educativas',
            description: 'Desarrollamos un sistema integral de matrícula para laboratorios virtuales...',
            heroImage: 'assets/background_projectshome.jpg'
        },
        'virtual-enrollment': {
            title: 'Sistema de Matrícula Virtual',
            subtitle: 'Plataforma completa de gestión de matrículas para laboratorios virtuales.',
            description: 'Sistema completo de matrícula virtual que permite a los estudiantes...',
            heroImage: 'assets/background_home.png'
        }
    };

    /* ----------------------------------------
       NAVIGATION & VIEW MANAGEMENT 
       ---------------------------------------- */
    /**
     *  Hides the project list and displays the details for a specific project.
     * @param {string} projectId - The ID of the project to show.
     */
    function showProjectDetails(projectId) {
        const projectData = projectsData[projectId] || {
            title: 'Proyecto Ejemplo',
            subtitle: 'Descripción del proyecto ejemplo',
            heroImage: 'assets/background_projectshome.jpg'
        };

        //  Update the hero section with the project's data. 
        projectTitle.textContent = projectData.title;
        projectSubtitle.textContent = projectData.subtitle;
        projectHero.style.backgroundImage = `url('${projectData.heroImage}')`;

        //  Smoothly transition between sections. 
        projectsSection.style.opacity = 0;
        setTimeout(() => {
            projectsSection.style.display = 'none';
            projectDetailSection.classList.remove('hidden');
            projectDetailSection.style.opacity = 1;
            window.scrollTo(0, 0); //  Scroll to the top of the page. 
            initCounters(); 
        }, 300);
    }

    /**
     *  Hides the project detail view and shows the main project list.
     */
    function backToProjects() {
        projectDetailSection.style.opacity = 0;
        setTimeout(() => {
            projectDetailSection.classList.add('hidden');
            projectsSection.style.display = 'block';
            projectsSection.style.opacity = 1;
        }, 300);
    }


    /* ----------------------------------------
       ANIMATIONS 
       ---------------------------------------- */
    /**
     *  Initializes all counters with a count-up animation effect.
     */
    function initCounters() {
        const counters = document.querySelectorAll('.countup, .result-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            let count = 0;
            const updateCount = () => {
                const increment = target / 100; //  Controls the speed of the animation. 
                count += increment;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    //  Initial call to animate counters on page load. 
    initCounters();


    /* ----------------------------------------
       EVENT LISTENERS 
       ---------------------------------------- */
    //  Adds a click event to each project card to show its details. 
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            if (projectId) showProjectDetails(projectId);
        });
    });

    //  Adds a click event to the "back" button.
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
    const sizeFilter = document.getElementById('size-filter');
    const yearFilter = document.getElementById('year-filter');
    const searchInput = document.getElementById('project-search');

    /**
     *  Filters the project cards based on the selected values and search input.
     */
    function filterProjects() {
        showLoading();
        const industryValue = industryFilter.value.toLowerCase();
        const techValue = techFilter.value.toLowerCase();
        const yearValue = yearFilter.value.toLowerCase();
        const searchValue = searchInput.value.toLowerCase();

        //  Use a timeout to simulate a loading delay and improve UX. 
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

    //  Add 'change' event listeners to all filter dropdowns. 
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
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img src="${imgSrc}" alt="Expanded image">
                </div>
            `;
            document.body.appendChild(modal);
            setTimeout(() => modal.classList.add('show'), 10); // Triggers the fade-in animation. 

            const closeModal = () => {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300); //  Removes the modal from the DOM after the transition ends. 
            };

            modal.querySelector('.close').addEventListener('click', closeModal);
            modal.addEventListener('click', e => {
                if (e.target === modal) closeModal(); //  Closes the modal if the backdrop is clicked. 
            });
        });
    });

    /*
     * Adds a global keydown event listener to close the modal with the "Escape" key for better accessibility.
    */
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            const modal = document.querySelector('.modal.show');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        }
    });

    /* ----------------------------------------
       INJECTED MODAL STYLES 
       ---------------------------------------- */
    /*
     *  Injects modal CSS directly into the document head to make the script self-contained.
    */
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 1001; opacity: 0; transition: opacity 0.3s ease; }
        .modal.show { opacity: 1; }
        .modal-content { position: relative; max-width: 90%; max-height: 90%; }
        .modal-content img { max-width: 100%; max-height: 85vh; border-radius: 10px; }
        .close { position: absolute; top: -35px; right: -5px; color: white; font-size: 35px; cursor: pointer; }
    `;
    document.head.appendChild(modalStyles);
});