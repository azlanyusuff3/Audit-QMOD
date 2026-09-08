const CACHE='audit-qmod-v5.11.1';
const MASTER='./Audit_QMOD_Master_Templates.xlsx';
const SHELL=['./index.html','./app.js?v=5.11.1','./audit-data.js?v=5.11.1','./manifest.json','./icon-192.png','./icon-512.png',MASTER,'./Audit_QMOD_SOP_Template.xlsx'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const req=event.request, url=new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // The master workbook is the live data source. Always prefer the repository copy when online.
  if (url.pathname.endsWith('/Audit_QMOD_Master_Templates.xlsx')) {
    event.respondWith((async()=>{
      try {
        const fresh=await fetch(req,{cache:'no-store'});
        if(fresh&&fresh.ok){const cache=await caches.open(CACHE);cache.put(MASTER,fresh.clone())}
        return fresh;
      } catch(e) {
        return (await caches.match(MASTER)) || Response.error();
      }
    })());
    return;
  }

  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith((async()=>{
      try {
        const fresh=await fetch(req,{cache:'no-store'});
        const cache=await caches.open(CACHE);cache.put('./index.html',fresh.clone());
        return fresh;
      } catch(e) { return (await caches.match('./index.html')) || Response.error(); }
    })());
    return;
  }

  event.respondWith((async()=>{
    const cached=await caches.match(req);
    const network=fetch(req,{cache:'no-cache'}).then(async fresh=>{
      if(fresh&&fresh.ok){const cache=await caches.open(CACHE);cache.put(req,fresh.clone())}
      return fresh;
    }).catch(()=>null);
    return cached || (await network) || Response.error();
  })());
});
