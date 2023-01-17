const express = require('express')
const router = new express.Router()
const Service = require('./../services/notify.service.js')
const service = new Service()


router.get('/',async (req,res) =>{
    var rsp = await service.obtener()
    res.json(rsp)
})

router.get('/all-first-todo',async (req,res) =>{
    var rsp = await service.getWithAssociations()
    res.json(rsp)
})

router.get('/all-first-notify',async (req,res) =>{
    var rsp = await service.getWithAssociationsNotify()
    res.json(rsp)
})

router.get('/todo-date/:date', async (req,res)=>{
    var rsp = await service.getTodoDate(req.params.date)
    res.json(rsp)
})


module.exports = router