const express = require('express')
const router = new express.Router()
const {models} = require('../db/connec')
const sequelize = require('../db/connec');
const AuthService = require('../services/auth.services')
const authservice = new AuthService

router.get('/', async (req, res) => {
    const data = await models.priorities.findAll()

    res.json(data)
})

router.post('/',async (req,res) =>{
    if (req.headers.authorization){
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)

        console.log(req.body)
        const {destination, message} = req.body
        console.log('Ha llegado algo')
        console.log(destination, message)
        rsp = await models.pendingnotifications.create({
        message: message,
        userid: destination,
        origin: pay.sub
    })
    res.json(rsp)

    }
    else{
        res.json({error: 'else'})
    }

    
})

module.exports = router 