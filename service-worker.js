/* Velas Studio — Service Worker */
const CACHE_NAME = "velas-studio-v5";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon.ico",
  "./icons/favicon-16x16.png",
  "./icons/favicon-32x32.png",
  "./icons/welcome-icon.png",
  "./icons/icon-mark.png",
  "./assets/inspiracion/vela_aromatica.jpg",
  "./assets/inspiracion/vela_minimalista.jpg",
  "./assets/inspiracion/vela_premium.jpg",
  "./assets/inspiracion/vela_floral.jpg",
  "./assets/inspiracion/velas_navideñas_1.jpg",
  "./assets/inspiracion/vela_de_regalo.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only handle GET requests for same-origin app shell assets.
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (isSameOrigin) {
    // Cache-first for app shell, falling back to network, then updating cache.
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req)
          .then((res) => {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
            return res;
          })
          .catch(() => caches.match("./index.html"));
      })
    );
  } else {
    // Network-first for third-party assets (e.g. Google Fonts), cache as fallback.
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req))
    );
  }
});
