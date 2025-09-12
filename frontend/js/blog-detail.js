// HTML injection of header and footer
fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch(err => console.error('Error al cargar header:', err));

fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(err => console.error('Error al cargar footer:', err));

//Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const logoImg = document.querySelector('.logo img'); 
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        logoImg.src = 'assets/jerad-logo-dark.png'; 
    } else {
        header.classList.remove('scrolled');
        logoImg.src = 'assets/jerad_logo.png';
    }
});

// Functions to load dynamic content from the backend
function setBlogHeroImage(imageUrl) {
    const heroSection = document.getElementById('blog-hero');
    heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${imageUrl})`;
}

function setBlogContent(title, author, date, content) {
    document.getElementById('blog-title').textContent = title;
    document.getElementById('blog-author').textContent = author;
    document.getElementById('blog-date').textContent = date;
    document.getElementById('blog-content').innerHTML = content;
}

function setSocialLinks(blogUrl, blogTitle) {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(blogTitle)}`;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(blogTitle)}&body=${encodeURIComponent(blogUrl)}`;
    
    document.getElementById('share-facebook').href = facebookUrl;
    document.getElementById('share-twitter').href = twitterUrl;
    document.getElementById('share-linkedin').href = linkedinUrl;
    document.getElementById('share-email').href = emailUrl;
}

function loadRelatedBlogs(blogs) {
    const grid = document.getElementById('related-blogs-grid');
    grid.innerHTML = '';
    
    blogs.forEach(blog => {
        const card = `
            <article class="blog-card" onclick="location.href='${blog.url}'">
                <div class="card-image" ${blog.image ? `style="background-image: url(${blog.image}); background-size: cover; background-position: center;"` : ''}>
                    ${!blog.image ? '<i class="fas fa-file-alt"></i>' : ''}
                </div>
                <div class="card-content">
                    <h3 class="card-title">${blog.title}</h3>
                    <p class="card-excerpt">${blog.excerpt}</p>
                    <div class="card-meta">
                        <span>${blog.author}</span>
                        <span>${blog.date}</span>
                    </div>
                </div>
            </article>
        `;
        grid.innerHTML += card;
    });
}