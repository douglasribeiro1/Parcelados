const CACHE_NAME = 'gestor-gastos-v2';
// Lista de arquivos vitais para o app funcionar offline
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/vue@3/dist/vue.esm-browser.js', 
  'https://unpkg.com/lucide@latest',
  'https://img.icons8.com/color/192/credit-card-front.png',
  'https://img.icons8.com/color/512/credit-card-front.png'
];

// Instalação: Cache dos arquivos iniciais
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Força o SW a ativar imediatamente
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Ativação: Limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
  self.clients.claim(); // Assume controle das páginas abertas
});

// Interceptação: Serve cache ou busca na rede
self.addEventListener('fetch', (event) => {
  // Ignora requisições do Firebase (Auth/Firestore) para não quebrar a lógica online
  if (event.request.url.includes('firebase') || event.request.url.includes('googleapis')) {
    return; 
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // Fallback opcional se estiver offline e sem cache
        // return caches.match('./offline.html');
      });
    })
  );
});
