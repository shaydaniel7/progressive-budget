console.log("Hello from your service worker file!");

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.webmanifest',
  '/assets/css/style.css',
  '/assets/js/loadImages.js',
  '/assets/images/icons/icon-72x72.png',
  '/assets/images/icons/icon-96x96.png',
  '/assets/images/icons/icon-128x128.png',
  '/assets/images/icons/icon-144x144.png',
  '/assets/images/icons/icon-152x152.png',
  '/assets/images/icons/icon-192x192.png',
  '/assets/images/icons/icon-384x384.png',
  '/assets/images/icons/icon-512x512.png',
  '/assets/images/1.jpg',
  '/assets/images/2.jpg',
  '/assets/images/3.jpg',
  '/assets/images/4.jpg',
  '/assets/images/5.jpg',
  '/assets/images/6.jpg',
  '/assets/images/7.jpg',
  '/assets/images/8.jpg',
  '/assets/images/9.jpg',
  '/assets/images/10.jpg',
  '/assets/images/11.jpg',
  '/assets/images/12.jpg',
  '/assets/images/13.jpg',
  '/assets/images/14.jpg',
  '/assets/images/15.jpg',
  '/assets/images/16.jpg',
  '/assets/images/17.jpg',
  '/assets/images/18.jpg',
  '/assets/images/19.jpg',
  '/assets/images/20.jpg',
  '/assets/images/21.jpg',
  '/assets/images/22.jpg',
  '/assets/images/23.jpg',
  '/assets/images/24.jpg',
  '/assets/images/25.jpg',
  '/assets/images/26.jpg',
  '/assets/images/27.jpg',
  '/assets/images/28.jpg',
  '/assets/images/29.jpg',
  '/assets/images/30.jpg',
  '/assets/images/31.jpg',
  '/assets/images/32.jpg',
  '/assets/images/33.jpg',
  '/assets/images/34.jpg',
  '/assets/images/35.jpg',
  '/assets/images/36.jpg',
  '/assets/images/37.jpg',
  '/assets/images/38.jpg'
];

self.addEventListener("install", function(evt){
    evt.waitUntil(
        caches.open(DATA_CACHE_NAME).then((cache) => {
            cache.add("/api/images")
        })
    )
    evt.waitUntil(caches.open(CACHE_NAME).THEN((cache)=>{
        cache.add(FILES_TO_CACHE)
    }))
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
        }))
    }))
    self.ClientRectList.claim();
})

self.addEventListener("fetch", function(evt){
    if(evt.requrest.url.includes ('/api/')){
        evt.respondWith(caches.open(DATA_CACHE_NAME).then(cache => {
            return fetch(evt.request)
        }))
    }
})
