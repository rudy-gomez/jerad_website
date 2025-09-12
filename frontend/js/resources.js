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