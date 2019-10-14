if ('serviceWorker' in navigator) {
  const options = {
    scope: './'
  }

  navigator.serviceWorker.register('./service-worker.js', options)
    .then(registration => {
      console.log('Service Workerの登録を行いました')
    })
    .catch(err => {
      console.error(err)
    })
}