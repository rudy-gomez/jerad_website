/* ========================================
   GENERAL INFORMATION
   ======================================== */
/**
 * @fileoverview Main logic for the services page.
  * @author 
 


/* ========================================
   DYNAMIC COMPONENT LOADING
   ======================================== */
/**
 * Dynamically loads the header content from an external HTML file.
 */
fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch(err => console.error('Error loading header:', err));

/**
 * Dynamically loads the footer .
 */
fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(err => console.error('Error loading footer:', err));


/* ========================================
   CLASS: CAROUSEL 3D
   ======================================== */
/**
 * @class Carousel3D
 * Handles the logic of an infinite 3D carousel.
 * - Controls navigation of image cards.
 * - Applies CSS 3D transformations.
 * - Supports autoplay and manual controls.
 */
class Carousel3D {
    /**
     * @param {HTMLElement} element The main carousel container element (e.g., <section>).
     */
    constructor(element) {
        this.element = element;
        this.cardsContainer = this.element.querySelector('.carousel-container');
        this.cards = Array.from(this.element.querySelectorAll('.image-card'));
        this.dotsContainer = this.element.querySelector('.carousel-indicators');
        this.nextButton = this.element.querySelector('.carousel-next');

        this.totalImages = this.cards.length;
        if (this.totalImages === 0) return; // Exit if no cards exist

        this.currentIndex = 0; 
        this.intervalId = null;

        this._createDots();
        this._setupEventListeners();
        this.updatePositions();
    }

    /**
     * Creates the navigation dots dynamically.
     * @private
     */
    _createDots() {
        if (!this.dotsContainer) return;
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.totalImages; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            dot.addEventListener('click', () => this.goTo(i));
            this.dotsContainer.appendChild(dot);
        }
        this.dots = Array.from(this.dotsContainer.querySelectorAll('.carousel-dot'));
    }

    /**
     * Sets up event listeners for carousel interactions.
     * @private
     */
    _setupEventListeners() {
        this.nextButton.addEventListener('click', () => this.next());
    }

    /**
     * Updates the position and style of all cards based on the current index.
     * Uses the modulo operator (%) to create an infinite loop effect.
     */
    updatePositions() {
        this.cards.forEach((card, i) => {
            const posIndex = (i - this.currentIndex + this.totalImages) % this.totalImages;
            card.setAttribute('data-index', posIndex);

            const order = posIndex === 1 ? this.totalImages : posIndex;
            card.style.order = order;
        });

        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }

    /** Moves to the next card. */
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalImages;
        this.updatePositions();
    }

    /** Moves to the previous card. */
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.updatePositions();
    }

    /**
     * Navigates to a specific card by index.
     * @param {number} index The index of the target card.
     */
    goTo(index) {
        if (index < 0 || index >= this.totalImages) return;
        this.currentIndex = index;
        this.updatePositions();
    }

    /**
     * Starts the carousel autoplay.
     * @param {number} delay Delay in milliseconds between transitions.
     */
    startAutoplay(delay = 15000) {
        if (this.intervalId) clearInterval(this.intervalId);
        this.intervalId = setInterval(() => this.next(), delay);
    }

    /** Stops the autoplay. */
    stopAutoplay() {
        clearInterval(this.intervalId);
    }
}

/* Static property for 3D transformation styles */
Carousel3D.POSITIONS = [
    { transform: 'translateX(-100%) scale(0.85) rotateY(35deg)', zIndex: 2, opacity: 0.7, filter: 'brightness(0.8)' }, // Left
    { transform: 'translateX(0) scale(1)', zIndex: 3, opacity: 1, filter: 'brightness(1)' },                           // Center
    { transform: 'translateX(100%) scale(0.85) rotateY(-35deg)', zIndex: 2, opacity: 0.7, filter: 'brightness(0.8)' }, // Right
    { transform: 'translateX(200%) scale(0.7) rotateY(-45deg)', zIndex: 1, opacity: 0.3, filter: 'brightness(0.6)' },  // Hidden Right
    { transform: 'translateX(-200%) scale(0.7) rotateY(45deg)', zIndex: 1, opacity: 0.3, filter: 'brightness(0.6)' }   // Hidden Left
];


/* ========================================
   GLOBAL INITIALIZATION
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Store all carousel instances in a map
    const carouselInstances = new Map();

    // Auto-discover carousels on the page
    document.querySelectorAll('.service-section').forEach(section => {
        const carousel = new Carousel3D(section);
        carouselInstances.set(section.id, carousel);
        carousel.startAutoplay();
    });

    // Handle CTA button clicks
    document.querySelectorAll('.cta-button').forEach((button, index) => {
        button.addEventListener('click', () => handleCTAClick(index + 1, button));
    });

    // Keyboard navigation (arrow keys)
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            const visibleServiceId = getCurrentVisibleService();
            const carousel = carouselInstances.get(visibleServiceId);
            if (carousel) {
                event.key === 'ArrowRight' ? carousel.next() : carousel.prev();
            }
        }
    });
    
    console.log('3D carousels successfully initialized.');
});


/* ========================================
   HELPER FUNCTIONS
   ======================================== */
/**
 * Handles the action when a "Send Inquiry" button is clicked.
 * Saves the interested service in sessionStorage and simulates a redirect.
 * @param {number} serviceNumber Service number (1, 2, 3).
 * @param {HTMLElement} button The clicked button.
 */
function handleCTAClick(serviceNumber, button) {
    const serviceNames = {
        1: 'IT Services & Tech Support',
        2: 'Web & Mobile Development',
        3: 'Process Automation'
    };
    const serviceName = serviceNames[serviceNumber];
    
    button.textContent = '✓ Redirecting...';
    button.style.background = 'linear-gradient(45deg, #4CAF50, #2E7D32)';
    
    sessionStorage.setItem('interestedService', serviceName);
    
    setTimeout(() => {
        // In a real case, the redirect would happen here.
        // window.location.href = 'contact.html';
        console.log(`Redirecting to contact page for service: ${serviceName}`);
        // Restore button (demo purpose)
        button.textContent = 'Send Inquiry';
        button.style.background = '';
    }, 800);
}

/**
 * Gets the ID of the currently most visible service section in the viewport.
 * Uses getBoundingClientRect() to calculate visibility.
 * @returns {string|null} ID of the visible section or null.
 */
function getCurrentVisibleService() {
    let mostVisibleSection = null;
    let maxVisibility = 0;

    document.querySelectorAll('.service-section').forEach(section => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
        
        if (visibleHeight > maxVisibility) {
            maxVisibility = visibleHeight;
            mostVisibleSection = section.id;
        }
    });

    return mostVisibleSection;
}
