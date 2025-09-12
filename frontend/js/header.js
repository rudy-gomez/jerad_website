// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const logoImg = document.querySelector('.logo img');

    const isBlogDetail = window.location.pathname.includes('blog-detail.html');

    if (window.scrollY > 50) {
        header.classList.add('scrolled');

        if (isBlogDetail && logoImg) {
            logoImg.src = 'assets/jerad-logo-dark.png';
        }
    } else {
        header.classList.remove('scrolled');

        if (isBlogDetail && logoImg) {
            logoImg.src = 'assets/jerad_logo.png';
        }
    }
});