const CACHE='controle-bags-offline-2026-08-16-v3-layout-online';
const FILES=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./offline-assets/tesseract.min.js','./offline-assets/worker.min.js','./offline-assets/tesseract-core/tesseract-core-simd-lstm.wasm.js','./offline-assets/tesseract-core/tesseract-core-simd-lstm.wasm','./offline-assets/lang/por.traineddata.gz','./offline-assets/lang/eng.traineddata.gz'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;})));
});
