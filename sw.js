// Service Worker for Bliss Makeover Studio and Academy
// Provides offline functionality and caching

const CACHE_NAME = 'bliss-makeup-studio-v5';
const urlsToCache = [
    '/',
    '/index.html',
    '/services.html',
    '/gallery.html',
    '/about.html',
    '/testimonials.html',
    '/contact.html',
    '/jewellery.html',
    '/css/style.css',
    '/css/services.css',
    '/css/gallery.css',
    '/css/about.css',
    '/css/testimonials.css',
    '/css/contact.css',
    '/css/jewellery.css',
    '/js/script.js',
    '/js/services.js',
    '/js/gallery.js',
    '/js/about.js',
    '/js/testimonials.js',
    '/js/contact.js',
    '/js/jewellery.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
