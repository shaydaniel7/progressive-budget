console.log("Hello from your service worker file!");

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

const FILES_TO_CACHE = [
  './',
  './index.html',
  './indexedDB.js',
  './manifest.webmanifest',
  './styles.css',
  './index.js',
  './service-worker.js',
  // './icons/icon-192x192.png',
  // './icons/icon-512x512.png'
];

//copied from class caching activity 12.2.20
self.addEventListener("install", function(evt){
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Your files were pre-cached successfully!");
            cache.add(FILES_TO_CACHE)          
        })  
    );
    // evt.waitUntil(caches.open(CACHE_NAME).THEN((cache)=>{
    //     cache.add(FILES_TO_CACHE)
    // }))
    self.skipWaiting();
});

self.addEventListener("activate", function(evt){
    evt.waitUntil(caches.keys().then(keyList => {
        return Promise.all(
        keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                console.log("removing all cache", key);
                return caches.delete(key)
            }
        }));
    }));
    self.clients.claim();
});

self.addEventListener("fetch", function(evt){
    if(evt.request.url.includes('/api/')){
        evt.respondWith(caches.open(DATA_CACHE_NAME).then(cache => {
            return fetch(evt.request)
            .then(response => {
                // If the response was good, clone it and store it in the cache.
                if (response.status === 200) {
                  cache.put(evt.request.url, response.clone());
                }   
                return response;
              })
              .catch(err => {
                // Network request failed, try to get it from the cache.
                return cache.match(evt.request);
              });
          }).catch(err => console.log(err))
        );   
        return;
      }
    
      // if the request is not for the API, serve static assets using "offline-first" approach.
      // see https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network
      evt.respondWith(
        caches.match(evt.request).then(function(response) {
          return response || fetch(evt.request);
        })
      );
    });
    