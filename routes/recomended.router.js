const express = require('express')
const config = require('../configuration/config')
const { Configuration, OpenAIApi } = require('openai')
const router = new express.Router()
const { models } = require('./../db/connec')
const sequelize = require('./../db/connec');
const AuthService = require('./../services/auth.services')
const authservice = new AuthService

router.post('/get-recomended', async (req, res) => {
    const { question, myTags } = req.body
    const KEY = config.openaiKey
    const myTagsString = JSON.stringify(myTags)
    const prompt = `Dame las etiqutas que coincidan con mi tarea, devuelve un array de objetos javascript y NADA MAS (Ejemplo:[{"id": 1,"tag": "etiqueta1"}, {"id": 2,"tag": "etiqueta2"}]) . Si no hay coincidencias con mis tareas existentes devuelve un array vacio "[]"   --> Etiquetas existentes: ${myTagsString}  Tarea:${question}`
    

    const configuration = new Configuration({
        apiKey: KEY
    })

    const openai = new OpenAIApi(configuration)
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 50,
    })
    const resString = completion.data.choices[0].text
    console.log(completion.data)
    console.log(JSON.parse(resString))

    res.json(JSON.parse(resString))
})



module.exports = router 