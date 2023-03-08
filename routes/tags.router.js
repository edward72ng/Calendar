const express = require('express')
const router = new express.Router()
const {models} = require('./../db/connec')
const sequelize = require('./../db/connec');
const AuthService = require('./../services/auth.services')
const authservice = new AuthService

router.get('/my-tags', async (req,res) =>{
    
    if (req.headers.authorization){
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)

        const data = await models.tags.findAll({
            where: {
                userid: pay.sub
            },
            attributes: ['id', 'tag']
        })
        res.json(data)
    }
})

router.post('/', async (req, res) => {
    const {tag} = req.body

    if (req.headers.authorization){
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const pay = await authservice.getPayload(newToken)

        const data = await models.tags.create({
            tag: tag,
            userid: pay.sub
        })
        res.json(data)
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {tag} = req.body

    const getTag = await models.tags.findByPk(id)

    const data = await getTag.update({
        tag: tag
    })

    res.json(data)
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params

    const getTag = await models.tags.findByPk(id)

    const data = await getTag.destroy()

    res.json(data)
})

module.exports = router 