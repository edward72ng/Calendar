const express = require('express')
const router = new express.Router()
const {models} = require('./../db/connec')
const sequelize = require('./../db/connec');
const AuthService = require('./../services/auth.services')
const authservice = new AuthService
const TodosService = require('./../services/todos.services.js')
const ItemsService = new TodosService()

router.get('/', async (req, res) => {
   if (req.headers.authorization){
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)
        const data =await ItemsService.getItemsForInbox(pay.sub)

        res.json(data)
    }
    else{
        res.json({error: 'else'})
    }
})

router.get('/:id', async (req, res) => {
   const {id} = req.params
         const data = await models.todo.findByPk(id, 
             {
             include: ['evento', 'notifications', 'myPriority', 'mySubtasks',{
                 model: models.tags,
                 as: 'myTags',
                 include: ['myColor']
             }]
             }
             )
 
         res.json(data)

 })




module.exports = router 