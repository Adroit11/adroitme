self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('adroitube-v1')
      .then(function(cache) {
        cache.addAll([
          '/adroitme/',
          '/adroitme/index.html',
          '/adroitme/src/css/main.css',
          '/adroitme/src/js/app.js',
        ])
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        return res;
      })
  );
});