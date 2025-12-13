const CACHE_NAME = 'shophub-v1'
const urlsToCache = [
  '/',
  '/index.html',
]

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).catch(() => {
          // Ignore cache errors
        })
      })
  )
  self.skipWaiting()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Don't cache API requests
  if (event.request.url.includes('/api/')) {
    return
  }
  
  // Don't cache Razorpay requests
  if (event.request.url.includes('razorpay.com') || event.request.url.includes('checkout.razorpay.com')) {
    return
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
      })
      .catch(() => {
        // If fetch fails, return cached version if available
        return caches.match(event.request)
      })
  )
})

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  return self.clients.claim()
})

