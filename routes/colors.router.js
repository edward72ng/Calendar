const express = require('express')
const router = new express.Router()
const {models} = require('./../db/connec')
const sequelize = require('./../db/connec');
const AuthService = require('./../services/auth.services')
const authservice = new AuthService

router.get('/',async (req,res) =>{
    const rsp = await models.colors.findAll()
    console.log(rsp)
    res.json(rsp)
})

module.exports = router 