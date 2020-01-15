// Caching Storage Name
var CACHE_NAME = "pwa-offline-v1";

// Caching File List
var filesToChche = ["/", "/css/app.css"];

// Service Worker Install Event (web resources caching)
self.addEventListener("install", function(event) {
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
