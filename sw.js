<<<<<<< HEAD
// Version erhöhen, wenn du die App änderst – dann lädt das iPhone die neue Version
const CACHE = "marketing-trainer-v2";
=======
// Netzwerk zuerst: Updates kommen sofort, offline wird die gespeicherte Version genutzt
const CACHE = "marketing-trainer-v3";
>>>>>>> abc4703b1babc671ac0991ba73647f88e071cf8c
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" }))))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request, { cache: "no-store" }).then(res => {
    if (res.ok && new URL(e.request.url).origin === location.origin) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request).then(hit => hit || caches.match("./index.html"))));
});
