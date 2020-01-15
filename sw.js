// Caching Storage Name
var CACHE_NAME = "pwa-offline-v1";

// Caching File List
var filesToChche = [
  "/",
  "/css/app.css",
  "images/gauntlet.jpg",
  "images/hammer.png",
  "images/refresh.svg",
  "images/shield.png",
  "favicon.png"
];

// Service Worker Install Event (web resources caching)
self.addEventListener("install", function(event) {
  //   console.log(["[Service Worker Install]", event]);
  // Wait Until Caching Install
  event.waitUntil(
    // caches = Cache storage reserved words
    caches
      .open(CACHE_NAME)
      .then(function(cache) {
        // Add Caching Files
        return cache.addAll(filesToChche);
      })
      .catch(function(error) {
        return console.log("Error!!!", error);
      })
  );
});

self.addEventListener("fetch", function(event) {
  //   console.log("[Service Worker Fetch]", event);
  // Return Fetch Event Result
  event.respondWith(
    // Return Caching
    caches
      .match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
      .catch(function(error) {
        return console.log("[Service Worker Fetch Error]", error);
      })
  );
});

self.addEventListener("activate", event => {
  const newCacheList = ["pwa-offline-v2"];
  event.waitUntil(
    caches
      .keys()
      .then(cacheList =>
        Promise.all(
          cacheList.map(cacheName => {
            if (newCacheList.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        )
      )
      .catch(error => {
        return console.log(error);
      })
  );
});
