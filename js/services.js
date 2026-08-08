// Services Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    initPricingCards();
    initServiceAnimations();
});

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Pricing cards hover effects
function initPricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Service animations
function initServiceAnimations() {
    // Intersection Observer for service details
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe service details
    document.querySelectorAll('.service-detail').forEach(detail => {
        observer.observe(detail);
    });

    // Observe pricing cards
    document.querySelectorAll('.pricing-card').forEach(card => {
        observer.observe(card);
    });

    // Observe FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        observer.observe(item);
    });
}

// Smooth scrolling for service links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .service-detail {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .service-detail.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .pricing-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .pricing-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .faq-item {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.6s ease;
    }
    
    .faq-item.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    .service-detail:nth-child(even) {
        animation-delay: 0.2s;
    }
    
    .service-detail:nth-child(odd) {
        animation-delay: 0.1s;
    }
`;
document.head.appendChild(style);
