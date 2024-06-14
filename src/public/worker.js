self.addEventListener('push', (e) => {
    const data = e.data.json()
    const options = {
        body: data.message,
        icon: './assets/favicon.ico'
    }

    console.log("Datos de la llamada",data)

    self.registration.showNotification(data.title, options);
})