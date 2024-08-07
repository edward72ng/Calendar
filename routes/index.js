const routerInbox = require('./inbox.router')
const routerUser = require('./user.router')
const routerAuth = require('./auth.router')
const routerEvents = require('./events.router')
const routerNotifications = require('./notifications.router')
const routerFolders = require('./folder.router')
const routerSections = require('./sections.router')
const routerInboxTasks = require('./inboxtasks.router')
const routerWorkers = require('./worker.router')
const routerTags = require('./tags.router')
const routerRecomended= require('./recomended.router')
const routerColors = require('./colors.router')
const routerPriorities = require('./priorities.router')
const routerSubTasks = require('./subtask.router')
const routerImages = require('./images.router')
const express = require('express')

function routerApi (app){
    const routerv1 = new express.Router()
    
    routerv1.use('/user',routerUser)
    routerv1.use('/auth',routerAuth)

    routerv1.use('/inbox',routerInbox)
    routerv1.use('/inboxtasks',routerInboxTasks)
    routerv1.use('/subtasks', routerSubTasks)

    routerv1.use('/events',routerEvents)
    routerv1.use('/notifications',routerNotifications)    
    routerv1.use('/images', routerImages)

    routerv1.use('/colors', routerColors)
    routerv1.use('/tags', routerTags)
    routerv1.use('/priorities', routerPriorities)

    routerv1.use('/folders',routerFolders)
    routerv1.use('/sections', routerSections)
    
    
    routerv1.use('/recomended', routerRecomended)
    routerv1.use('/workers',routerWorkers)

    app.use('/api/v1',routerv1)
}

module.exports = routerApi