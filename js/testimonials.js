// Testimonials Page JavaScript

let currentIndex = 0;
let slideInterval;

document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initTestimonialFilter();
    initAnimations();
    initAutoPlay();
});

// Carousel functionality
function initCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Show first slide
    showSlide(0);
    
    // Auto-play carousel
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
    
    // Pause on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                changeSlide(1);
            }, 5000);
        });
    }
}

// Change slide
function changeSlide(direction) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Hide current slide
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    // Calculate new slide index
    currentIndex += direction;
    
    // Wrap around
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    
    // Show new slide
    showSlide(currentIndex);
}

// Show specific slide
function currentSlide(slideIndex) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Hide current slide
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    // Set new current slide
    currentIndex = slideIndex - 1;
    
    // Show new slide
    showSlide(currentIndex);
}

// Show slide with animation
function showSlide(slideIndex) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
    
    // Add animation class
    slides[slideIndex].style.animation = 'fadeIn 0.5s ease-in-out';
}

// Testimonial filter functionality
function initTestimonialFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filter testimonial cards
            testimonialCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            // Animate visible cards
            setTimeout(() => {
                const visibleCards = document.querySelectorAll('.testimonial-card:not(.hidden)');
                visibleCards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.1}s`;
                    card.classList.add('animate-in');
                });
            }, 100);
        });
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for testimonial cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe testimonial cards
    document.querySelectorAll('.testimonial-card').forEach(card => {
        observer.observe(card);
    });

    // Observe stat items
    document.querySelectorAll('.stat-item').forEach(item => {
        observer.observe(item);
    });
}

// Auto-play functionality
function initAutoPlay() {
    // Restart auto-play when page becomes visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(slideInterval);
        } else {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                changeSlide(1);
            }, 5000);
        }
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .testimonial-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .testimonial-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .stat-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .stat-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .stat-item:nth-child(1) { transition-delay: 0.1s; }
    .stat-item:nth-child(2) { transition-delay: 0.2s; }
    .stat-item:nth-child(3) { transition-delay: 0.3s; }
    .stat-item:nth-child(4) { transition-delay: 0.4s; }
`;
document.head.appendChild(style);

// Counter animation for stats
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = parseFloat(stat.textContent.replace(/[^\d.]/g, ''));
        const suffix = stat.textContent.replace(/[\d.]/g, '');
        const duration = 2000;
        const increment = finalNumber / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                current = finalNumber;
                clearInterval(timer);
            }
            stat.textContent = current.toFixed(1) + suffix;
        }, 16);
    });
}

// Initialize counter animation when stats come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.review-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Export functions for global access
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;
