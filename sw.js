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
  'https://res.cloudinary.com/dc9kfp5gt/image/upload/c_scale,e_art:incognito,h_340,q_100,w_330/v1519764764/IMG_20180227_214951_697_o3buej.jpg',
  'https://res.cloudinary.com/dc9kfp5gt/image/upload/q_100/v1528384527/screencapture-localhost-3000-2018-06-05-20_41_26_rbrhy9.png',
  'https://res.cloudinary.com/dc9kfp5gt/image/upload/q_100/v1528384519/screencapture-localhost-alc-cryptoproject2-2018-05-29-18_01_21_hvewgy.png',
  'https://res.cloudinary.com/dc9kfp5gt/image/upload/q_100/v1519847220/screencapture-localhost-AdroitCodeEditor-1519847116464_w1fkwy.png',
  'https://res.cloudinary.com/dc9kfp5gt/image/upload/q_100/v1519841760/IMG_20171221_095641_175_yjf3hk.jpg',
  'https://res.cloudinary.com/dc9kfp5gt/image/upload/c_scale,h_997,q_100,w_2282/v1519844075/IMG_20180228_195245_856_q2rmgp.jpg',
  'https://res.cloudinary.com/dc9kfp5gt/image/upload/q_100/v1519844075/IMG_20180228_195206_491_pbfxhk.jpg',
  'https://res.cloudinary.com/dc9kfp5gt/image/upload/q_100/v1519844075/IMG_20180228_195119_365_h0qqlb.jpg',
  'cloudinary.com/dc9kfp5gt/image/upload/q_100/v1519844074/IMG_20180228_195319_319_oav1q3.jpg',
  'https://res.cloudinary.com/dc9kfp5gt/image/upload/q_100/v1519841760/IMG_20171228_080715_466_iiosgv.jpg',
  'https://res.cloudinary.com/dc9kfp5gt/image/upload/q_100/v1519844074/IMG_20180228_195029_290_zznqvs.jpg',
  'https://res.cloudinary.com/dc9kfp5gt/image/upload/q_100/v1519841760/IMG_20171025_085240_684_uqhbxq.jpg',
  'https://res.cloudinary.com/dc9kfp5gt/image/upload/c_scale,h_400,q_100,w_460/v1519840117/Google-Dev-EMEA-Badge_tahpnu.png',
  'https://res.cloudinary.com/dc9kfp5gt/image/upload/c_scale,h_400,q_100,w_460/v1519835751/DHUUexfXUAAnXn3_ahhhpp.jpg',
  'https://res.cloudinary.com/dc9kfp5gt/image/upload/q_100/v1520243603/left_bg_1_umblkn.png'    
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