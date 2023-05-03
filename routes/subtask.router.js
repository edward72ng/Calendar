const express = require('express')
const config = require('../configuration/config')
const { Configuration, OpenAIApi } = require('openai')
const router = new express.Router()
const { models } = require('./../db/connec')
const sequelize = require('./../db/connec');
const AuthService = require('./../services/auth.services')
const authservice = new AuthService

router.post('/create', async (req,res) =>{
    const {content, details, taskid} = req.body
    console.log(req.body)
        const data = await models.subtask.create(req.body)
        res.json(data)
    
})

router.delete('/delete/:id', async (req,res) =>{
    const {id} = req.params
    
        const subtask = await models.subtask.findByPk(id)
        const data = await subtask.destroy()
        res.json(data)
    
})

router.put('/update/:id', async (req,res) =>{
    const {id} = req.params
    const {content, details} = req.body
    console.log(req.body)
        const subtask = await models.subtask.findByPk(id)
    const data = await subtask.update(req.body)
        res.json(data)
    
})

router.post('/generate', async (req,res) =>{
    const {taskid} = req.body
    const KEY = config.openaiKey

    const task = await models.todo.findByPk(taskid,{
        attributes: ['content']
    })
    
    const prompt = `Genera maximo 5 subtareas apartir de esta tarea: ${task.content}, SOLO responde en un formato JSON(sin saltos de linea). Ej: [{"content": "subtarea1"}, {"content":"subtarea2"}]`
    console.log('PROMPT',prompt)

    const configuration = new Configuration({
        apiKey: KEY
    })

    const openai = new OpenAIApi(configuration)
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 2000,
    })
    const resString = completion.data.choices[0].text
    console.log("RESULTADO",resString)
    const subTasksParse =JSON.parse(resString)
    
    const subTasks = subTasksParse.map((elem) => {
        return ({
            ...elem,
            details: '',
            taskid: taskid,
        })
    })

    const subTasksGenerate = await models.subtask.bulkCreate(subTasks)

    res.json(subTasksGenerate)
    
})

module.exports = router 