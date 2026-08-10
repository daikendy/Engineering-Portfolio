/**
 * Portfolio PWA Service Worker (v3.2.0)
 * Caches core HTML, CSS, JS, images, and fonts for offline support and instant loading.
 */

const CACHE_NAME = 'kt-portfolio-cache-v3.2.0';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/styles.css',
  './assets/data.js',
  './assets/components.js',
  './assets/site.js',
  './assets/favicon.svg',
  './assets/icon-192.svg',
  './assets/icon-512.svg',
  './assets/vps-architecture.png',
  './assets/resumaxxing-banner.PNG',
  './assets/eruscent-banner.png',
  './releases/resumaxxing.html',
  './releases/eruscent.html',
  './notes/vps-economics-scaling.html',
  './notes/orm-tradeoffs.html',
  './notes/concurrency-model.html',
  './notes/invisible-deploy-tools.html',
  './notes/on-call-lessons.html',
  './notes/webhook-idempotency.html'
];

// Install Event — Cache Static Core Assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event — Clean up Old Caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event — Network First with Offline Cache Fallback
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone response to update cache dynamically
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache if offline
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});
