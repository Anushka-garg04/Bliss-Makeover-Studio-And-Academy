// Jewellery Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initJewelleryFilter();
    initJewelleryReveal();
});

// Collection filter functionality
function initJewelleryFilter() {
    const filterButtons = document.querySelectorAll('.jewel-filters .filter-btn');
    const cards = document.querySelectorAll('.jewel-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });

            revealVisibleCards();
        });
    });
}

// Reveal animation for cards
function initJewelleryReveal() {
    const cards = document.querySelectorAll('.jewel-card');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    cards.forEach(card => observer.observe(card));
}

function revealVisibleCards() {
    const cards = document.querySelectorAll('.jewel-card:not(.hidden)');
    cards.forEach(card => card.classList.add('revealed'));
}