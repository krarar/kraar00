// تأكد من أن هذا الكود في سياق Service Worker
self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(
        Promise.all([
            self.importScripts(
                'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',
                'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js'
            )
        ]).then(() => {
            firebase.initializeApp({
                apiKey: "AIzaSyDGpAHia_wEmrhnmYjrPf1n1TrAzwEMiAI",
                authDomain: "messageemeapp.firebaseapp.com",
                projectId: "messageemeapp",
                storageBucket: "messageemeapp.appspot.com",
                messagingSenderId: "255034474844",
                appId: "1:255034474844:web:5e3b7a6bc4b2fb94cc4199"
            });

            const messaging = firebase.messaging();

            messaging.onBackgroundMessage((payload) => {
                console.log('Received background message:', payload);

                const notificationOptions = {
                    body: payload.notification.body,
                    icon: payload.notification.icon || './pngwing.com.png',
                    badge: './pngwing.com.png',
                    tag: payload.data?.notificationId || 'default',
                    data: payload.data,
                    requireInteraction: true,
                    actions: [
                        {
                            action: 'view',
                            title: 'عرض'
                        },
                        {
                            action: 'close',
                            title: 'إغلاق'
                        }
                    ],
                    vibrate: [200, 100, 200],
                    silent: false
                };

                return self.registration.showNotification(
                    payload.notification.title,
                    notificationOptions
                );
            });
        })
    );
});

// Cache configuration
const CACHE_VERSION = 'v1.0.1';
const CACHE_NAME = `taxi-app-cache-${CACHE_VERSION}`;

const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './style.css',
    './app.js',
    './firebase-messaging-sw.js'
];

const EXTERNAL_ASSETS = [
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.rtl.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js'
];

// Cache installation
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all([
                cache.addAll(STATIC_ASSETS.map(url => new Request(url, {credentials: 'same-origin'}))),
                ...EXTERNAL_ASSETS.map(url => 
                    fetch(url, { mode: 'no-cors' })
                        .then(response => cache.put(url, response))
                        .catch(error => console.warn(`Failed to cache: ${url}`, error))
                )
            ]);
        })
    );
});

// Cache cleanup
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => 
            Promise.all(
                keys.filter(key => 
                    key.startsWith('taxi-app-cache-') && key !== CACHE_NAME
                ).map(key => caches.delete(key))
            )
        ).then(() => {
            console.log('Service Worker activated and controlling all clients');
            return clients.claim();
        })
    );
});

// Fetch handler
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request).then((response) => {
                if (response.ok && event.request.url.startsWith(self.location.origin)) {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                }
                return response;
            }).catch(() => {
                if (event.request.mode === 'navigate') {
                    return caches.match('./offline.html');
                }
            });
        })
    );
});