// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFAQ();
    initAnimations();
    initBusinessHours();
});

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Handle contact form submission
function handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate all fields
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showMessage('Please fill in all required fields correctly.', 'error');
        return;
    }

    // Store in localStorage for demo purposes
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    // Open WhatsApp with the message
    const waMessage = `Hi Bliss, this is ${data.firstName} ${data.lastName}.\nPhone: ${data.phone}\nService: ${data.service || 'Not specified'}\nPreferred Date: ${data.preferredDate || 'Not specified'}\n\n${data.message}`;
    window.open('https://wa.me/919410016655?text=' + encodeURIComponent(waMessage), '_blank', 'noopener');

    // Show success message
    showMessage('Thank you! WhatsApp is opening with your message - press send to deliver it.', 'success');
    
    // Reset form
    form.reset();
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);

    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }

    switch (fieldName) {
        case 'phone':
            const phoneRegex = /^[6-9]\d{9}$/;
            if (value && !phoneRegex.test(value.replace(/\D/g, ''))) {
                showFieldError(field, 'Please enter a valid 10-digit phone number');
                return false;
            }
            break;
    }

    return true;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Show message
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    // Insert at the top of the form
    const form = document.querySelector('.contact-form');
    if (form) {
        form.insertBefore(messageDiv, form.firstChild);
    }

    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

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

// Animations
function initAnimations() {
    // Intersection Observer for animations
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

    // Observe elements for animation
    document.querySelectorAll('.contact-card, .faq-item').forEach(el => {
        observer.observe(el);
    });
}

// Business hours status
function initBusinessHours() {
    const statusIndicator = document.querySelector('.status-indicator');
    if (!statusIndicator) return;

    const now = new Date();
    const hour = now.getHours();

    const isOpen = hour >= 10 && hour < 20;
    const statusText = isOpen ? 'Open Now' : 'Closed';

    statusIndicator.innerHTML = `
        <i class="fas fa-circle" style="color: ${isOpen ? '#25d366' : '#dc3545'}"></i> ${statusText} | Open Every Day 10 AM - 8 PM
    `;

    // Update every minute
    setInterval(initBusinessHours, 60000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .contact-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .contact-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .faq-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .faq-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loading {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #d4af37;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

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

window.initBusinessHours = initBusinessHours;
