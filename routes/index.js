const routerInbox = require('./inbox.router')
const routerDnotify = require('./dnotify.router')
const routerUser = require('./user.router')
const routerAuth = require('./auth.router')
const routerEvents = require('./events.router')
const routerNotifications = require('./notifications.router')
const routerFolders = require('./folder.router')
const routerSections = require('./sections.router')
const routerPending = require('./pendingnotifications.router')
const routerContacts = require('./contacts.router')
const routerInboxTasks = require('./inboxtasks.router')
const routerWorkers = require('./worker.router')
const express = require('express')
const router = require('./auth.router')

function routerApi (app){
    const routerv1 = new express.Router()
    
    routerv1.use('/inbox',routerInbox)
    routerv1.use('/dnotify',routerDnotify)
    routerv1.use('/user',routerUser)
    routerv1.use('/auth',routerAuth)
    routerv1.use('/events',routerEvents)
    routerv1.use('/notifications',routerNotifications)    
    routerv1.use('/folders',routerFolders)
    routerv1.use('/sections', routerSections)
    routerv1.use('/pending',routerPending)
    routerv1.use('/contacts',routerContacts)
    routerv1.use('/inboxtasks',routerInboxTasks)
    routerv1.use('/workers',routerWorkers)
    app.use('/api/v1',routerv1)

}

module.exports = routerApi