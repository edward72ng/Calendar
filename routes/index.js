const routerInbox = require('./inbox.router')
const routerDnotify = require('./dnotify.router')
const routerUser = require('./user.router')
const routerAuth = require('./auth.router')
const express = require('express')


function routerApi (app){
    const routerv1 = express.Router()
    
    routerv1.use('/inbox',routerInbox)
    routerv1.use('/dnotify',routerDnotify)
    routerv1.use('/user',routerUser)
    routerv1.use('/auth',routerAuth)
    app.use('/api/v1',routerv1)

}

module.exports = routerApi