const express = require('express')
const router = new express.Router()
const {models} = require('./../db/connec')

const sequelize = require('./../db/connec');
const Authservice = require('./../services/auth.services')
const authservice = new Authservice
const Eventsservice = require('./../services/events.service')
const eventService = new Eventsservice
router.get('/all',async (req, res)=>{
    const data = await models.events.findAll({
        
        include: ['tareas']
    })
    res.json(data)
})
router.get('/with-events',async (req, res)=>{
    const {folder} = req.query;
    if (req.headers.authorization){
        console.log('hay header authorization :D')
        console.log(req.headers.authorization)
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        console.log(newToken)
        const pay = await authservice.getPayload(newToken)
        console.log(pay.sub)
        const dat = await eventService.getAllEvents(pay.sub, folder)
     
        /*const data = await models.todo.findAll({
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
        */
        res.json(dat)
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
        
        if(data.length == 0){
            res.json(rsp)
        }else{
            data[0].tareas.map((arr)=>{
                if (arr.userid == pay.sub){
                    rsp.push(arr)
                }
            })
            res.json(rsp)
        }
            
    }
else{
    res.send('unautoraized')
}

    
})

module.exports = router