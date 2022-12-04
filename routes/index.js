const routerInbox = require('./inbox.router')
const routerDnotify = require('./dnotify.router')
const routerUser = require('./user.router')
const routerAuth = require('./auth.router')
const routerEvents = require('./events.router')
const routerNotifications = require('./notifications.router')
const express = require('express')


function routerApi (app){
    const routerv1 = express.Router()
    
    routerv1.use('/inbox',routerInbox)
    routerv1.use('/dnotify',routerDnotify)
    routerv1.use('/user',routerUser)
    routerv1.use('/auth',routerAuth)
    routerv1.use('/events',routerEvents)
    routerv1.use('/notifications',routerNotifications)    
    app.use('/api/v1',routerv1)

}

module.exports = routerApi