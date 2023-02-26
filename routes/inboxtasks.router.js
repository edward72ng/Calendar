const express = require('express')
const router = new express.Router()
const {models} = require('./../db/connec')
const sequelize = require('./../db/connec');
const AuthService = require('./../services/auth.services')
const authservice = new AuthService

router.get('/', async (req, res) => {
   if (req.headers.authorization){
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)
        const data = await models.todo.findAll(
            {where: {
                userid: pay.sub,
                folderid: null,
                sectionid: null
            },
            include: ['evento', 'notifications']
            }
            )
        res.json(data)
    }
    else{
        res.json({error: 'else'})
    }
})





module.exports = router 