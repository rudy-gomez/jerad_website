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
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Variables simples para la paginación
let currentPosition = 0;
const moveDistance = 300;

// Variables para la paginación
let currentIndex = 0;
const cardWidth = 280;
const cardGap = 32; 
const cardMoveDistance = cardWidth + cardGap; 

// Función para mover al siguiente
function nextBlog() {
    const track = document.getElementById('blogCardsTrack');
    const totalCards = track.children.length;
    const maxIndex = totalCards - 2; 
    
    if (currentIndex < maxIndex) {
        currentIndex++;
        const newPosition = currentIndex * cardMoveDistance;
        track.style.transform = `translateX(-${newPosition}px)`;
    }
}

// Función para mover al anterior  
function prevBlog() {
    const track = document.getElementById('blogCardsTrack');
    
    if (currentIndex > 0) {
        currentIndex--;
        const newPosition = currentIndex * cardMoveDistance;
        track.style.transform = `translateX(-${newPosition}px)`;
    }
}