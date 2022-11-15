const express = require('express')
const router = express.Router()

const TodosService = require('./../services/todos.services.js')
const service = new TodosService()




const validate = require('./../middlewares/middleware.schema')
const {createTodo , updateTodo, idTodo} = require('./../schemas/joi.schema')

router.get('/',async (req,res,next) =>{
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
module.exports = router