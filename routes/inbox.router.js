const express = require('express')
const router = new express.Router()
const {models} = require('./../db/connec')
const TodosService = require('./../services/todos.services.js')
const service = new TodosService()
const AuthService = require('./../services/auth.services')
const authservice = new AuthService()

const validate = require('./../middlewares/middleware.schema')

router.put('/your-todos/:id',
    async (req, res)=>{
        if(req.headers.authorization)
        {
            console.log(req.body)
            var data = await service.editYourTodo(req.params.id, req.body)
            res.json(data)
        }


    }
)

router.post('/your-todos',
async (req,res,next)=>{
    if (req.headers.authorization){
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)
        console.log(req.body)

        var data = await service.createYourTodo(req.body,pay.sub)
        res.json(data)
    }
})

router.delete('/your-todos/:id',
async (req,res,next)=>{
    try{
        var ids = req.params.id
        var act = await service.borar(ids)
        res.json(act)
    }
    catch(err){
        next(err)
    }
}
)

router.get('/time-block/:date', async (req,res,next)=>{
    const {date} = req.params;
    if (req.headers.authorization){
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)

        var data = await models.todo.findAll({
            where: {
                userid: pay.sub,
                timeblockdate: date,
            }
        })
        res.json(data)
    }
    else{
        res.send('unauthorized')
    }
    }
)

router.get('/get-all/:userid', async (req, res) => {
    const {userid} = req.params
    const tasks = await models.todo.findAll({
        where: {
            userid: userid
        }
    });
    
    res.json(tasks)
})

module.exports = router