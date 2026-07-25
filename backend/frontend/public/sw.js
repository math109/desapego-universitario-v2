const CACHE_NAME = "desapego-v1";
const URLS_ESSENCIAIS = ["/", "/manifest.json"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_ESSENCIAIS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(
        nomes.filter((nome) => nome !== CACHE_NAME).map((nome) => caches.delete(nome))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => {
        return caches.match(request).then((cached) => {
          if (cached) return cached;

          // Só devolve a página inicial como fallback se for navegação
          // (o usuário abrindo/recarregando uma página, não um script/imagem)
          if (request.mode === "navigate") {
            return caches.match("/");
          }

          // Pra outros tipos de arquivo (JS, CSS, etc.), não força fallback errado
          return new Response("", { status: 404, statusText: "Not found in cache" });
        });
      })
  );
});