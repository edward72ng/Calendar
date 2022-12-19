const express = require('express')
const router = express.Router()

const {models} = require('./../db/connec')

const TodosService = require('./../services/todos.services.js')
const service = new TodosService()
const AuthService = require('./../services/auth.services')
const authservice = new AuthService()

router.get('/',async (req,res)=>{
    const data = await models.folders.findAll();
    res.json(data);
})

module.exports =  router