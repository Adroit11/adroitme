/*self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('adroitube-v1')
      .then(function(cache) {
        cache.addAll([
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
*/
var APP_PREFIX = 'My Portfolio'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // Add URL you want to cache in this list.
  '/adroitme/',                     // If you have separate JS/CSS files,
  '/adroitme/index.html',
  '/adroitme/src/css/main.css',
  '/adroitme/src/js/app.js',
  '/adroitme/src/img/adroitcode.png',
  '/adroitme/src/img/adroitube.png',
  '/adroitme/src/img/buhari.jpg',
  '/adroitme/src/img/crypto.png',
  '/adroitme/src/img/fcc.jpg',
  '/adroitme/src/img/google.png',
  '/adroitme/src/img/lagos.jpg',
  '/adroitme/src/img/linux.jpg',
  '/adroitme/src/img/logo.jpg',
  '/adroitme/src/img/mac.jpg',
  '/adroitme/src/img/mypics.jpg',
  '/adroitme/src/img/panda.jpg',
  '/adroitme/src/img/pomodo.jpg',
  '/adroitme/src/img/smile.jpg',   
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})