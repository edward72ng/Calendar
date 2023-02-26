const express = require('express')
const router = new express.Router()

const {models} = require('./../db/connec')

const TodosService = require('./../services/todos.services.js')
const service = new TodosService()
const AuthService = require('./../services/auth.services')
const { where } = require('sequelize')
const authservice = new AuthService()

router.get('/',async (req,res)=>{
    if (req.headers.authorization){
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)
        const data = await models.folders.findAll({
            where:{
                userid:pay.sub,
            }})
        res.json(data);
    }
    else{
        res.send('unauthorized')
    }
})

router.post('/',async (req,res)=>{
    const {name} = req.body
    if (req.headers.authorization){
        var token = req.headers.authorization.replace("Bearer ", "");
        const pay = await authservice.getPayload(token)
        const data = await models.folders.create({
            name: name,
            userid: pay.sub
        })
        res.json(data);
    }
    else{
        res.send('unauthorized')
    }
    
})

router.post('/:folderId',async (req,res)=>{
    const {folderId} = req.params
    const {todoId} = req.body
    const data = await models.todo.update({
        folderid: folderId
    },
    {
        where:{
            id: todoId
        }
    })
    res.json(data)
})

router.delete('/:folderId',async (req,res)=>{
    const {folderId} = req.params
    const folder = await models.folders.findByPk(folderId)
    const data = await folder.destroy()
    console.log(data)
    res.json(data)
})

router.get('/me', async (req, res) => {
    if (req.headers.authorization){
        let token = req.headers.authorization;
        let newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)

        const folders = await models.folders.findAll({
            where: {
                userid: pay.sub,
            }
        })
        res.json(folders)
    }
})

router.get('/collaborative', async (req, res) => {
    if (req.headers.authorization){
        let token = req.headers.authorization;
        let newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)

        const folders = await models.folders.findAll({
            where: {
                collaborative: true,
                userid: pay.sub,
            }
        })
        res.json(folders)
    }
})

router.get('/all', async (req, res) => {
    if (req.headers.authorization){
        let token = req.headers.authorization;
        let newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)

        const folders = await models.folders.findAll({
            where: {
                userid: pay.sub
            },
            include: [{
                model: models.sections,
                as: 'sectionsInFolder',
                include: [
                    {
                        model: models.todo,
                        as: 'tasksInSections',
                        include: ['evento', 'notifications']
                    }
                ]
            }]
        })
        res.json(folders)
    }
})

router.get('/without-sections', async (req, res) => {
    if (req.headers.authorization){
        let token = req.headers.authorization;
        let newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)

        const folders = await models.folders.findAll({
            where: {
                userid: pay.sub
            },
            include: [{
                model: models.todo,
                as: 'blocsInFolder',
                where: {
                    sectionid: null,
                },
                include : ['evento', 'notifications']
            }]
        })
        res.json(folders)
    }
})


router.put('/:folderId',async (req,res)=>{
    const {folderId} = req.params
    const body = req.body
    const folder = await models.folders.findByPk(folderId)
    const data = await folder.update(body)
    res.json(data)
})

module.exports =  router