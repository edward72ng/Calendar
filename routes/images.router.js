const express = require('express')
const router = new express.Router()
const {models} = require('./../db/connec')
const sequelize = require('./../db/connec');


router.post('/',async (req,res) =>{
    const {todoid, imageurl} = req.body

    const rsp = await models.images.create({
        todoid: todoid,
        imageurl: imageurl
    })
    res.json(rsp)
})

router.delete('/:id',async (req,res) =>{
    const {id} = req.params

    const image = await models.images.findByPk(id)
    console.log(image)
    const rsp = await image.destroy()

    res.json(rsp)
})

module.exports = router 