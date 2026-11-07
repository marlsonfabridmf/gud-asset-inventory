const CACHE_NAME = "gud-inventory-v1";

const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    self.clients.claim()
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});