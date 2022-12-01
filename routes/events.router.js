const express = require('express')
const router = express.Router()
const {models} = require('./../db/connec')

router.get('/all',async (req, res)=>{
    const data = await models.events.findAll({
        include: ['tareas']
    })
    res.json(data)
})
router.get('/with-events',async (req, res)=>{
    const data = await models.todo.findAll({
        where: {
            userid: 1
        },
        include: ['evento']
        
    })
    res.json(data)
})

module.exports = router