const express = require('express')
const router = express.Router()
const Service = require('./../services/notify.service.js')
const service = new Service()


router.get('/',async (req,res) =>{
    var rsp = await service.obtener()
    res.json(rsp)
})

router.get('/all',async (req,res) =>{
    var rsp = await service.getWithAssociations()
    res.json(rsp)
})


module.exports = router