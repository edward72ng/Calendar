const express = require('express')
const router = express.Router()

const {models} = require('./../db/connec')

const TodosService = require('./../services/todos.services.js')
const service = new TodosService()
const AuthService = require('./../services/auth.services')
const authservice = new AuthService()


const validate = require('./../middlewares/middleware.schema')
const {createTodo , updateTodo, idTodo} = require('./../schemas/joi.schema')


router.get('/',async (req,res,next) =>{
    console.log(req.headers)
    if (req.headers.authorization){
        console.log('hay header authorization :D')
        console.log(req.headers.authorization)
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        console.log(newToken)
        const pay = await authservice.getPayload(newToken)
        console.log(pay)
    }
    res.json(await service.obtener())
})


router.post('/',
validate(createTodo, 'body'),
async(req,res)=>{
    var bd = await service.postear(req.body)
    res.json (bd)
    
})

router.put('/:id',
validate(idTodo, 'params'),
validate(updateTodo, 'body'),
async (req,res, next)=>{
 try{
    var ids = req.params.id
    var obj = req.body
    var act = await service.editar(ids,obj)
    res.json (act)
 }
 catch(err){
    next(err)
 }
})

router.delete('/:id',
validate(idTodo, 'params'),
async (req,res,next)=>{
    try{
        var ids = req.params.id
        var act = await service.borar(ids)
        res.json(act)
    }
    catch(err){
        next(err)
    }
})

router.get('/todonotify',

async(req,res)=>{
    var bd = await service.obtenerTdNtf()
    res.json (bd)
    
})

router.get('/your-todos',
    async (req,res,next)=>{
        const {folder} = req.query;
        if (req.headers.authorization){
            var token = req.headers.authorization;
            var newToken = token.replace("Bearer ", "");
            const pay = await authservice.getPayload(newToken)
            var data = await service.getYourTodos(pay.sub, folder)
            console.log(folder)
            res.json(data)
        }
        else{
            res.send('unauthorized')
        }
    }
),

router.get('/your-todos/:id',
    async (req,res,next)=>{
        if (req.headers.authorization){
            console.log('hay header authorization :D')
            console.log(req.headers.authorization)
            var token = req.headers.authorization;
            var newToken = token.replace("Bearer ", "");
            console.log(newToken)
            const pay = await authservice.getPayload(newToken)
            console.log(pay)

            var data = await service.getOne(req.params.id/*, pay.sub*/)
            res.json(data)
        }
        else{
            res.send('unauthorized')
        }
    }
),

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
        console.log(pay)

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

router.post('/capture', (req, res)=>{
    console.log(req.body)
})

router.get('/with-folder',async (req,res)=>{
    const data = await models.todo.findAll({
        include: ['folder']
    })

    res.json(data)
})

module.exports = router