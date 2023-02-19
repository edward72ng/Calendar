const express = require('express')
const router = new express.Router()
const {models} = require('./../db/connec')
const sequelize = require('./../db/connec');
const AuthService = require('./../services/auth.services')
const authservice = new AuthService

router.post('/',async (req,res) =>{
    if (req.headers.authorization){
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)

        console.log(req.body)
        const {destination, message} = req.body
        console.log('Ha llegado algo')
        console.log(destination, message)
        rsp = await models.pendingnotifications.create({
        message: message,
        userid: destination,
        origin: pay.sub
    })
    res.json(rsp)

    }
    else{
        res.json({error: 'else'})
    }

    
})

router.get('/all',async (req, res) => {
    const today = new Date().toISOString().slice(0, 10); 
    const dateArray = await models.notifications.findAll({
        where: sequelize.literal(`DATE(date) = '${today}'`),
        include:[
          {
            model: models.todo,
            as:'todo',
            include: [
              {
                model: models.usuarios,
                as: 'user',
                include: [
                  {
                    model: models.subscriptions,
                    as: 'subscriptions',
                    include: ['keys']
                  }
                ]
              }
            ],
          }
        ]
      });
      
      const values = dateArray.map((row) => row.toJSON())
      console.log(values)
      res.json(dateArray)
})

module.exports = router 