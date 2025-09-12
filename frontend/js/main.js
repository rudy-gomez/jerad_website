function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    
    // Toggle active class
    faqItem.classList.toggle('active');
    
    // Toggle answer visibility
    answer.classList.toggle('show');
    
    // Close other open FAQs
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').classList.remove('show');
        }
    });
}

const current = window.location.pathname.split("/").pop();
const links = document.querySelectorAll('header nav ul li a');

links.forEach(link => {
    if(link.getAttribute('href') === current) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});
