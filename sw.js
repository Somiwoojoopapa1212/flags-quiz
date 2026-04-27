// v:2026-04-27T07:41:30
const CACHE = 'flags-quiz-v:2026-04-27T07:41:30';
const ASSETS = [
  '/flags-quiz/',
  '/flags-quiz/index.html',
  '/flags-quiz/manifest.json',
  '/flags-quiz/icons/icon-192.png',
  '/flags-quiz/icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
