const express = require('express')
const router = new express.Router()
const Service = require('./../services/user.service.js')
const service = new Service()

const validate = require('./../middlewares/middleware.schema')
const {createUser,idTodo} = require('./../schemas/joi.schema')

router.get('/',async (req,res) =>{
    var rsp = await service.getting()
    res.json(rsp)
})

router.get('/:id',async (req,res) =>{
    const {id} = req.params
    var rsp = await service.getOne(id)
    res.json(rsp)
})

router.get('/all',async (req,res) =>{
    var rsp = await service.getWithAssociations()
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





module.exports = router