self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache-v1')
      .then(cache => {
        return cache.addAll([
          './',
          './index.html',
          './script.js'
        ])
      })
      .then(() => {
        console.log('キャッシュが完了しました')
      })
  )
})

self.addEventListener('fetch', event => {
  console.log('fetchイベントが発生しました。')
  console.log('Request', event.request)

  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log(response)
        return response
      } else {
        return fetch(event.request)
      }
    })
  )
})