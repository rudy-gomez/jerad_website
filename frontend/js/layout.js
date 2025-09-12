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
        })
        .catch(err => console.error('Error loading footer:', err));
});