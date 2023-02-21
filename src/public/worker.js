console.log('Service Worker')

self.addEventListener('push', (e) => {
    const data = e.data.json()

    console.log(data)

    self.registration.showNotification(data.title, {
        body: data.message,
        icon: './assets/favicon.ico'
    });
})