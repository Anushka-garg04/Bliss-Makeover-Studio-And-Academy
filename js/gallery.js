// Gallery Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initGalleryFilter();
    initLightbox();
    initGalleryAnimations();
    initImageLazyLoading();
});

// Gallery filter functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            // Animate visible items
            setTimeout(() => {
                const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden)');
                visibleItems.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.1}s`;
                    item.classList.add('animate-in');
                });
            }, 100);
        });
    });
}

// Lightbox functionality
let currentImageIndex = 0;
let currentImages = [];

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    changeImage(-1);
                    break;
                case 'ArrowRight':
                    changeImage(1);
                    break;
            }
        }
    });
}

// Open lightbox
function openLightbox(imageId) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');

    // Get all visible gallery items
    const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden)');
    currentImages = Array.from(visibleItems);

    // Find current image index
    const currentItem = document.querySelector(`[onclick*="${imageId}"]`).closest('.gallery-item');
    currentImageIndex = currentImages.indexOf(currentItem);

    // Set image source and info
    const img = currentItem.querySelector('img');
    const title = currentItem.querySelector('.gallery-content h3').textContent;
    const description = currentItem.querySelector('.gallery-content p').textContent;

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;

    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Preload adjacent images
    preloadAdjacentImages();
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Change image in lightbox
function changeImage(direction) {
    if (currentImages.length === 0) return;

    currentImageIndex += direction;

    // Wrap around
    if (currentImageIndex < 0) {
        currentImageIndex = currentImages.length - 1;
    } else if (currentImageIndex >= currentImages.length) {
        currentImageIndex = 0;
    }

    const currentItem = currentImages[currentImageIndex];
    const img = currentItem.querySelector('img');
    const title = currentItem.querySelector('.gallery-content h3').textContent;
    const description = currentItem.querySelector('.gallery-content p').textContent;

    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');

    // Fade out current image
    lightboxImage.style.opacity = '0';

    setTimeout(() => {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
        lightboxImage.style.opacity = '1';
    }, 200);

    // Preload adjacent images
    preloadAdjacentImages();
}

// Preload adjacent images for smooth navigation
function preloadAdjacentImages() {
    const preloadCount = 2; // Preload 2 images on each side
    
    for (let i = 1; i <= preloadCount; i++) {
        // Preload next images
        const nextIndex = (currentImageIndex + i) % currentImages.length;
        const nextItem = currentImages[nextIndex];
        if (nextItem) {
            const nextImg = nextItem.querySelector('img');
            const preloadImg = new Image();
            preloadImg.src = nextImg.src;
        }

        // Preload previous images
        const prevIndex = (currentImageIndex - i + currentImages.length) % currentImages.length;
        const prevItem = currentImages[prevIndex];
        if (prevItem) {
            const prevImg = prevItem.querySelector('img');
            const preloadImg = new Image();
            preloadImg.src = prevImg.src;
        }
    }
}

// Share image functionality
function shareImage(imageId) {
    const shareButton = document.querySelector(`[onclick*="${imageId}"]`);
    shareButton.classList.add('share-animation');

    // Get image info
    const currentItem = document.querySelector(`[onclick*="${imageId}"]`).closest('.gallery-item');
    const img = currentItem.querySelector('img');
    const title = currentItem.querySelector('.gallery-content h3').textContent;
    const description = currentItem.querySelector('.gallery-content p').textContent;

    // Check if Web Share API is supported
    if (navigator.share) {
        navigator.share({
            title: `${title} - Bliss Makeover Studio and Academy`,
            text: description,
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(title, description);
        });
    } else {
        fallbackShare(title, description);
    }

    // Remove animation class
    setTimeout(() => {
        shareButton.classList.remove('share-animation');
    }, 600);
}

// Fallback share method
function fallbackShare(title, description) {
    const shareText = `Check out this amazing work from Bliss Makeover Studio and Academy: ${title} - ${description}`;
    const shareUrl = window.location.href;
    
    // Copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
            showNotification('Link copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = `${shareText}\n${shareUrl}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Link copied to clipboard!');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #f0d98c, #b8922b);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 14px;
        box-shadow: 0 8px 30px rgba(212, 175, 55, 0.35);
        z-index: 10001;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Gallery animations
function initGalleryAnimations() {
    // Intersection Observer for gallery items
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

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });
}

// Lazy loading for images
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loading');
                    
                    // Simulate loading delay for demo
                    setTimeout(() => {
                        img.classList.remove('loading');
                    }, 500);
                    
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .gallery-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .gallery-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .lightbox-image {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeImage = changeImage;
window.shareImage = shareImage;
