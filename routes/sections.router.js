const express = require('express')
const router = new express.Router()
const {models} = require('./../db/connec')
const { Op } = require("sequelize");
const sequelize = require('./../db/connec');
const AuthService = require('./../services/auth.services')
const authservice = new AuthService

router.get('/',async (req,res) =>{
    rsp = await models.sections.findAll()
    res.json(rsp)
})
router.get('/with-folders',async (req,res) =>{
    rsp = await models.folders.findAll(
        {
            include:['sectionsInFolder']
        }
    )
    res.json(rsp)
})
router.get('/:id',async (req,res) =>{
    const {id} = req.params
    rsp = await models.sections.findByPk(id,
        {

            include:['blocsInSection']
        }
    )
    res.json(rsp)
})
router.post('/:sectionId',async (req, res)=>{
    const {sectionId} = req.params
    const {todoId} = req.body
    const todo = await models.todo.findByPk(todoId)
    const resp = await todo.update({sectionid: sectionId})
    res.json(resp)
})

module.exports = router