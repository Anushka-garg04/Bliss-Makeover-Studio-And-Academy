// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initTeamAnimations();
    initAchievementCounters();
    initScrollAnimations();
});

// Team member animations
function initTeamAnimations() {
    const teamMembers = document.querySelectorAll('.team-member');
    
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

    teamMembers.forEach(member => {
        observer.observe(member);
    });
}

// Achievement counter animation
function initAchievementCounters() {
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    achievementItems.forEach(item => {
        observer.observe(item);
    });
}

// Animate counter numbers
function animateCounter(element) {
    const numberElement = element.querySelector('.achievement-number');
    const finalNumber = parseInt(numberElement.textContent.replace(/\D/g, ''));
    const suffix = numberElement.textContent.replace(/\d/g, '');
    const duration = 2000;
    const increment = finalNumber / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            current = finalNumber;
            clearInterval(timer);
        }
        numberElement.textContent = Math.floor(current) + suffix;
    }, 16);

    // Add animation class
    element.classList.add('animate');
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.highlight-item, .feature-item, .story-text, .story-image');
    
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

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .team-member {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .team-member.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .highlight-item,
    .feature-item,
    .story-text,
    .story-image {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .highlight-item.animate-in,
    .feature-item.animate-in,
    .story-text.animate-in,
    .story-image.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .highlight-item:nth-child(1) { transition-delay: 0.1s; }
    .highlight-item:nth-child(2) { transition-delay: 0.2s; }
    .highlight-item:nth-child(3) { transition-delay: 0.3s; }
    
    .feature-item:nth-child(1) { transition-delay: 0.1s; }
    .feature-item:nth-child(2) { transition-delay: 0.2s; }
    .feature-item:nth-child(3) { transition-delay: 0.3s; }
    .feature-item:nth-child(4) { transition-delay: 0.4s; }
    .feature-item:nth-child(5) { transition-delay: 0.5s; }
    .feature-item:nth-child(6) { transition-delay: 0.6s; }
`;
document.head.appendChild(style);

// Team member hover effects
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    member.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Feature item hover effects
document.querySelectorAll('.feature-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Achievement item hover effects
document.querySelectorAll('.achievement-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scrolling for internal links
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

// Loading animation for images
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Add loading animation styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    img[loading="lazy"] {
        transition: opacity 0.3s ease;
    }
    
    .team-member img,
    .story-image img {
        transition: transform 0.3s ease;
    }
    
    .team-member:hover img {
        transform: scale(1.1);
    }
`;
document.head.appendChild(loadingStyle);
