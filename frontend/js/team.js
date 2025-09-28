// Team Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const teamCards = document.querySelectorAll('.team-card');
    const modal = document.getElementById('memberModal');
    const modalClose = document.querySelector('.modal-close');

    // Datos de los miembros del equipo
    const teamData = {
        1: {
            name: "Rudy Gomez",
            position: "Presidente",
            experience: "15 años de experiencia",
            image: "assets/rudy-bg.png",
            specialty: "Desarrollo Backend y Arquitectura de Sistemas. Especializado en la creación de APIs escalables y gestión de bases de datos complejas.",
            strengths: [
                "Liderazgo estratégico y visión de negocio",
                "Arquitectura de software escalable",
                "Gestión de equipos de desarrollo",
                "Toma de decisiones bajo presión"
            ],
            technologies: ["Python", "Node.js", "PostgreSQL", "MongoDB", "AWS", "Docker", "Kubernetes"],
            projects: [
                {
                    name: "Sistema ERP Corporativo",
                    description: "Desarrollo completo de sistema de gestión empresarial para empresa multinacional"
                },
                {
                    name: "Plataforma E-commerce",
                    description: "Arquitectura y desarrollo de plataforma de ventas online con más de 100k usuarios"
                }
            ]
        },
        2: {
            name: "Alexis Huamaní",
            position: "RR.HH.",
            experience: "15 años de experiencia",
            image: "assets/team/alexis-huamani.jpg",
            specialty: "Gestión de Recursos Humanos y Desarrollo Backend. Enfocado en crear ambientes de trabajo productivos y soluciones tecnológicas eficientes.",
            strengths: [
                "Gestión y desarrollo del talento humano",
                "Desarrollo de APIs RESTful",
                "Resolución de conflictos organizacionales",
                "Optimización de procesos de trabajo"
            ],
            technologies: ["Java", "Spring Boot", "MySQL", "Redis", "Git", "Jira", "Slack"],
            projects: [
                {
                    name: "Sistema de Gestión de Personal",
                    description: "Plataforma integral para manejo de recursos humanos y nómina"
                },
                {
                    name: "Portal de Capacitación Online",
                    description: "Desarrollo de LMS para formación continua de empleados"
                }
            ]
        },
        3: {
            name: "Ederson Gomez",
            position: "Tesorero",
            experience: "15 años de experiencia",
            image: "assets/team/ederson-gomez.jpg",
            specialty: "Gestión Financiera y Desarrollo Backend. Especializado en sistemas de pagos y análisis financiero automatizado.",
            strengths: [
                "Análisis financiero y presupuestario",
                "Desarrollo de sistemas de facturación",
                "Gestión de flujo de caja",
                "Integración con pasarelas de pago"
            ],
            technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "PayPal API", "Stripe", "Excel"],
            projects: [
                {
                    name: "Sistema de Facturación Electrónica",
                    description: "Desarrollo de plataforma completa de facturación con integración SUNAT"
                },
                {
                    name: "Dashboard Financiero",
                    description: "Panel de control para análisis financiero en tiempo real"
                }
            ]
        },
        4: {
            name: "José Flores Antezana",
            position: "Frontend Developer",
            experience: "10 años de experiencia",
            image: "assets/team/member4.jpg",
            specialty: "Desarrollo Frontend y Experiencia de Usuario. Especializado en crear interfaces modernas y responsive que mejoran la experiencia del usuario.",
            strengths: [
                "Desarrollo de interfaces responsive",
                "Optimización de rendimiento web",
                "Experiencia de usuario (UX/UI)",
                "Animaciones y micro-interacciones"
            ],
            technologies: ["React", "Vue.js", "TypeScript", "Sass", "Tailwind CSS", "Figma", "Webpack"],
            projects: [
                {
                    name: "Aplicación Web Corporativa",
                    description: "Interface moderna para sistema de gestión empresarial"
                },
                {
                    name: "Landing Pages Corporativas",
                    description: "Desarrollo de múltiples sitios web corporativos con alto rendimiento"
                }
            ]
        },
        5: {
            name: "Dhean Fernandez Phillman",
            position: "Full Stack Developer",
            experience: "8 años de experiencia",
            image: "assets/team/member5.jpg",
            specialty: "Desarrollo Full Stack y DevOps. Especializado en crear soluciones completas desde la base de datos hasta la interfaz de usuario.",
            strengths: [
                "Desarrollo end-to-end de aplicaciones",
                "Configuración de servidores y CI/CD",
                "Integración de APIs y servicios",
                "Optimización de bases de datos"
            ],
            technologies: ["React", "Node.js", "Python", "PostgreSQL", "Docker", "AWS", "Jenkins"],
            projects: [
                {
                    name: "Plataforma SaaS Multiusuario",
                    description: "Desarrollo completo de aplicación web con arquitectura multiusuario"
                },
                {
                    name: "Sistema de Monitoreo",
                    description: "Herramienta de monitoreo en tiempo real para infraestructura de servidores"
                }
            ]
        },
        6: {
            name: "Fritz Brenner Flores",
            position: "UI/UX Designer",
            experience: "6 años de experiencia",
            image: "assets/team/member6.jpg",
            specialty: "Diseño de Experiencia de Usuario y Interfaces. Especializado en crear diseños centrados en el usuario que maximizan la usabilidad y conversión.",
            strengths: [
                "Investigación de usuarios y usabilidad",
                "Prototipado y wireframing",
                "Diseño de sistemas de diseño",
                "Testing de interfaces y A/B testing"
            ],
            technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision", "Miro", "Hotjar"],
            projects: [
                {
                    name: "Rediseño de App Mobile",
                    description: "Mejora completa de UX/UI que incrementó la retención en 40%"
                },
                {
                    name: "Sistema de Diseño Corporativo",
                    description: "Creación de design system para múltiples productos digitales"
                }
            ]
        },
    };

    // Abrir modal al hacer clic en una card
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            const memberData = teamData[memberId];
            
            if (memberData) {
                populateModal(memberData);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Cerrar modal
    modalClose.addEventListener('click', closeModal);
    
    // Cerrar modal al hacer clic en el overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function populateModal(data) {
        // Información básica
        document.getElementById('modalImage').src = data.image;
        document.getElementById('modalImage').alt = data.name;
        document.getElementById('modalName').textContent = data.name;
        document.getElementById('modalPosition').textContent = data.position;
        document.getElementById('modalExperience').textContent = data.experience;
        document.getElementById('modalSpecialty').textContent = data.specialty;

        // Fortalezas
        const strengthsList = document.getElementById('modalStrengths');
        strengthsList.innerHTML = '';
        data.strengths.forEach(strength => {
            const li = document.createElement('li');
            li.textContent = strength;
            strengthsList.appendChild(li);
        });

        // Tecnologías
        const techContainer = document.getElementById('modalTechnologies');
        techContainer.innerHTML = '';
        data.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = tech;
            techContainer.appendChild(span);
        });

        // Proyectos
        const projectsContainer = document.getElementById('modalProjects');
        projectsContainer.innerHTML = '';
        data.projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project-item';
            
            const projectName = document.createElement('div');
            projectName.className = 'project-name';
            projectName.textContent = project.name;
            
            const projectDesc = document.createElement('div');
            projectDesc.className = 'project-description';
            projectDesc.textContent = project.description;
            
            projectDiv.appendChild(projectName);
            projectDiv.appendChild(projectDesc);
            projectsContainer.appendChild(projectDiv);
        });
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});