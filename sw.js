/* 웬들러 5·3·1 — 오프라인 캐시 */
var VERSION = "26.09.20-3";
var CACHE = "w531-v" + VERSION;
var CORE = ["./", "./index.html", "./manifest.webmanifest",
            "./apple-touch-icon.png", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE)
      .then(function(c){
        /* 브라우저 HTTP 캐시를 건너뛰고 서버에서 새로 받는다 */
        return c.addAll(CORE.map(function(u){ return new Request(u, { cache:"reload" }); }));
      })
      .catch(function(){})
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys()
      .then(function(ks){
        return Promise.all(ks.map(function(k){ return k === CACHE ? null : caches.delete(k); }));
      })
      .then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  if (e.request.method !== "GET") return;
  if (e.request.url.indexOf("version.json") >= 0) return;
  e.respondWith(
    caches.match(e.request).then(function(hit){
      if (hit) return hit;
      return fetch(e.request).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); }).catch(function(){});
        return res;
      }).catch(function(){
        return caches.match("./index.html");
      });
    })
  );
});
