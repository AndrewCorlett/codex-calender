self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open('static').then(c=>c.addAll(['/manifest.json'])))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
