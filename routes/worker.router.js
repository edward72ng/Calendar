const express = require('express')
const router = new express.Router()
const {models} = require('../db/connec')
const webpush = require('../utils/webpush')
const AuthService = require('../services/auth.services')
const authservice = new AuthService()
let pushSubscription;

router.post('/subscribed', async (req, res)=>{
    if (req.headers.authorization){
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)

        pushSubscription = req.body
        console.log('Backend suscribed', req.body)

        const payload = JSON.stringify(
        {
            title: 'Notification',
            message: 'Hello world!!'
        }
    )
     try {
        await webpush.sendNotification(pushSubscription, payload)
    } catch (error) {
        console.log('ERROR IN SUBSCRIBED', error)
    }


    try {
        const {keys} = req.body
        const {endpoint, expirationTime} = req.body
        console.log(keys)
        
        const subscriptionExist= await models.subscriptions.findOne({
            where: {
                endpoint: endpoint
            }
        })

        if(subscriptionExist){
            throw new Error('La suscripcion ya existe')
        }

        const keytable = await models.keystable.create(keys)
        const subscriptionTable = await models.subscriptions.create({
            userid: pay.sub, 
            endpoint, 
            expirationTime, 
            keyid: keytable.id})

        res.json(subscriptionTable)

    } catch (error) {
        console.log(error)
        res.status(400)
    }}
})

module.exports = router