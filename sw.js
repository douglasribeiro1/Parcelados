const CACHE_NAME = 'gestor-gastos-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/vue@3/dist/vue.global.prod.js',
  'https://unpkg.com/lucide@latest',
  'https://img.icons8.com/color/96/credit-card-front.png',
  'https://img.icons8.com/color/192/credit-card-front.png',
  'https://img.icons8.com/color/512/credit-card-front.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
