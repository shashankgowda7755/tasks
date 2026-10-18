const CACHE_NAME = 'task-tracker-v2';
const ASSETS = [
    './',
    './index.html',
    './app.js',
    './manifest.json',
    './fonts/fonts.css',
    'https://cdn.tailwindcss.com'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
