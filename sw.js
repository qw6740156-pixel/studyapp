self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("study-timer").then(cache => {
      return cache.addAll([
        "/studyapp/",
        "/studyapp/index.html",
        "/studyapp/script.js",
        "/studyapp/manifest.json"
      ]);
    })
  );
});
