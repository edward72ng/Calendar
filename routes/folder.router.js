const express = require('express')
const router = express.Router()

const {models} = require('./../db/connec')

const TodosService = require('./../services/todos.services.js')
const service = new TodosService()
const AuthService = require('./../services/auth.services')
const authservice = new AuthService()

router.get('/',async (req,res)=>{
    if (req.headers.authorization){
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)
    
        const data = await models.folders.findAll({
            where:{
                userid:pay.sub
            }
        });
        res.json(data);
    }
    else{
        res.send('unauthorized')
    }
    
})

module.exports =  router