const express = require('express')
const router = new express.Router()
const {models} = require('./../db/connec')
const sequelize = require('./../db/connec');
const AuthService = require('./../services/auth.services')
const authservice = new AuthService

router.get('/', async (req, res) => {

    //const data = await models.usuarios.findAll()
   if (req.headers.authorization){
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)
        const data = await models.usuarios.findAll(
            {where: {
                uid: pay.sub
            },
                include: ['myContacts']})
        res.json(data[0].myContacts)
    }
    else{
        res.json({error: 'else'})
    }
    //res.json(data)
})

router.post('/',async (req,res) =>{
    if (req.headers.authorization){
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)
        const {contactId} = req.body

        console.log('creando conexion de contactos')
        await models.contacts.create({
            personid : pay.sub,
            contactid: contactId
        })
        await models.contacts.create({
            personid : contactId,
            contactid: pay.sub,
        })
    }
    else{
        res.json({error: 'else'})
    }
})



module.exports = router 