const express = require('express')
const router = express.Router()
const {models} = require('./../db/connec')
const { Op } = require("sequelize");
const sequelize = require('./../db/connec');
const Authservice = require('./../services/auth.services')
const authservice = new Authservice
router.get('/all',async (req, res)=>{
    const data = await models.events.findAll({
        
        include: ['tareas']
    })
    res.json(data)
})
router.get('/with-events',async (req, res)=>{
    if (req.headers.authorization){
        console.log('hay header authorization :D')
        console.log(req.headers.authorization)
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        console.log(newToken)
        const pay = await authservice.getPayload(newToken)
        console.log(pay.sub)

        //var data = await service.getYourTodos(pay.sub)
        //res.json(data)
        const data = await models.todo.findAll({
            where: {
                userid: pay.sub,
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
    }
    else{
        res.send('unauthorized')
    }

})
router.get('/day-events/:today',async (req, res)=>{//falta pay.sub
    if (req.headers.authorization){
        console.log('hay header authorization :D')
        console.log(req.headers.authorization)
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        console.log(newToken)
        const pay = await authservice.getPayload(newToken)
        console.log(pay.sub)
    
        const data = await models.events.findAll({
            where: sequelize.where(sequelize.col('event'),req.params.today),
            include: ['tareas']//implemtar uso del token para ver el use
        })
        let rsp = []
        data[0].tareas.map((arr)=>{
            if (arr.userid == pay.sub){
                rsp.push(arr)
            }
        })
    
        res.json(rsp)
    
    }
else{
    res.send('unautoraized')
}

    
})

module.exports = router