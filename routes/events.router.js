const express = require('express')
const router = express.Router()
const {models} = require('./../db/connec')
const { Op } = require("sequelize");
const sequelize = require('./../db/connec');
router.get('/all',async (req, res)=>{
    const data = await models.events.findAll({
        
        include: ['tareas']
    })
    res.json(data)
})
router.get('/with-events',async (req, res)=>{
    const data = await models.todo.findAll({
        where: {
            userid: 1,
            eventid: {
                [Op.not]: null
            }
        },
        include: ['evento']
        
    })

    const send = [] 
    data.map((arr)=>{
        send.push(arr)
    })
    res.json(send)
})
router.get('/day-events/:today',async (req, res)=>{
    const data = await models.events.findAll({
        where: sequelize.where(sequelize.col('event'),req.params.today),
        include: ['tareas']//implemtar uso del token para ver el user
    })
    res.json(data)
})

module.exports = router