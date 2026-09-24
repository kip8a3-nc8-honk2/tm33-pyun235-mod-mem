const CACHE_NAME = "tu-mu-v2.0";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png", 
  "./TemplateData/favicon.ico",
  "./TemplateData/style.css",
  "./TemplateData/unity-logo-dark.png",
  "./TemplateData/unity-logo-light.png",
  "./TemplateData/webgl-logo.png",
  "./TemplateData/fullscreen-button.png",
  "./TemplateData/progress-bar-empty-dark.png",
  "./TemplateData/progress-bar-empty-light.png",
  "./TemplateData/progress-bar-full-dark.png",
  "./TemplateData/progress-bar-full-light.png",
  "./Build/WebGL_GitHub_PWA_mod.loader.js",
  "./Build/WebGL_GitHub_PWA_mod.data",
  "./Build/WebGL_GitHub_PWA_mod.framework.js",
  "./Build/WebGL_GitHub_PWA_mod.wasm"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match("./index.html").then(response => {
        return response || fetch(event.request);
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});