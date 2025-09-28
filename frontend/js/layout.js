document.addEventListener('DOMContentLoaded', () => {
    // Inject header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            const links = document.querySelectorAll('header nav ul li a');
            const currentPath = window.location.pathname.split('/').pop();

            links.forEach(link => {
                const linkPath = link.getAttribute('href');
                if (linkPath === currentPath) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        })
        .catch(err => console.error('Error al cargar header:', err));

    // Inject footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            
            // Footer line animation
            initFooterLineAnimation();
        })
        .catch(err => console.error('Error loading footer:', err));
});

function initFooterLineAnimation() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    // Create animated line element
    const animatedLine = document.createElement('div');
    animatedLine.className = 'footer-animated-line';
    footer.appendChild(animatedLine);
    
    let animated = false;
    
    // Observer to detect when the footer is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animatedLine.classList.add('animate');
                animated = true;
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(footer);
}