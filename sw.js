// ===== PWA SERVICE WORKER =====
// Cache-first strategy for lesson content and static shell

// Course-specific cache name. Bump the version suffix whenever shell assets change.
const CACHE_NAME = 'n8n-basics-lms-v1';

// Static shell files to cache on install
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/module.html',
  '/css/styles.css',
  '/js/course.js',
  '/manifest.json',
  '/favicon.svg',
  // PPTX_SHELL_START
  // PPTXjs in-browser slide viewer (vendored locally so it works offline)
  '/js/vendor/pptxjs/pptxjs.css',
  '/js/vendor/pptxjs/jquery.min.js',
  '/js/vendor/pptxjs/jszip.min.js',
  '/js/vendor/pptxjs/filereader.js',
  '/js/vendor/pptxjs/pptxjs.js',
  '/js/vendor/pptxjs/divs2slides.js'
  // PPTX_SHELL_END
];

// Module directories — cache lesson.md and mind-map.json for offline access.
// (Slide decks are cached on first view by the cache-first handler below, to keep
// the install step light when decks are large.)
const MODULE_DIRS = ["module-1-basics", "module-2-setup", "module-3-workflow", "module-4-practice"];

const MODULE_CONTENT = MODULE_DIRS.flatMap(dir => [
  `/${dir}/content/lesson.md`,
  `/${dir}/content/mind-map.json`
]);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache shell immediately; silently skip missing module content
      return cache.addAll(SHELL_ASSETS).then(() =>
        Promise.allSettled(MODULE_CONTENT.map(url => cache.add(url)))
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  // HEAD requests are used by the app for existence checks (e.g. does this module
  // have a slides.pptx?). Network-first, then fall back to a cached GET so the
  // check succeeds offline. ignoreMethod lets a HEAD match a cached GET response.
  if (event.request.method === 'HEAD') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request, { ignoreMethod: true, ignoreSearch: true })
          .then(cached => cached
            ? new Response(null, { status: 200, headers: cached.headers })
            : new Response(null, { status: 504 }))
      )
    );
    return;
  }

  // Only handle GET requests beyond this point
  if (event.request.method !== 'GET') return;

  // For HTML pages: network-first (so updates propagate)
  if (event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then(resp => {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return resp;
        })
        // Offline fallback. ignoreSearch lets a request like module.html?id=1
        // match the cached /module.html (query strings select the module client-side).
        .catch(() => caches.match(event.request, { ignoreSearch: true }))
    );
    return;
  }

  // For everything else: cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        if (resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return resp;
      });
    })
  );
});
