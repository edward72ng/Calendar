const express = require('express')
const router = new express.Router()
const Service = require('./../services/user.service.js')
const service = new Service()
const AuthService = require('./../services/auth.services')
const authservice = new AuthService()
const validate = require('./../middlewares/middleware.schema')
const {createUser,idTodo} = require('./../schemas/joi.schema')
const {models} = require('../db/connec')

router.get('/notifications', async (req, res) => {
    if (req.headers.authorization){
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)
        const data = await service.getMyNotifications(pay.sub)

        res.json(data)
    }
    else{
        res.json({error: 'else'})
    }
})

router.get('/',async (req,res) =>{
    var rsp = await service.getting()
    res.json(rsp)
})


router.get('/all',async (req,res) =>{
    var rsp = await service.getWithAssociations()
    res.json(rsp)
})

router.get('/:id',async (req,res) =>{
    const {id} = req.params
    var rsp = await service.getOne(id)
    res.json(rsp)
})

router.post('/sing-up',
validate(createUser, 'body'),
async (req,res) =>{
    var rsp = await service.createUser(req.body)
    res.json(rsp)
})

router.put('/:id',
validate(idTodo,'params'),
validate(createUser, 'body'),
async (req,res) =>{
    var rsp = await service.update(req.params.id,req.body)
    res.json(rsp)
}
)

router.delete('/:id',
validate(idTodo,'params'),
async (req,res,next)=>{
    try{
        var ids = req.params.id
        var act = await service.deleteUser(ids)
        res.json(act)
    }
    catch(err){
        next(err)
    }
})



router.get('/search/:value', async (req, res) => {
    const {value} = req.params
    const data = await service.searchContacts(value)

    res.json(data)
})



module.exports = router