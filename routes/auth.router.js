const express = require('express')
const router = new express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('./../configuration/config')

const validate = require('./../middlewares/middleware.schema')
const {createUser} = require('./../schemas/joi.schema')

router.post('/login',
validate(createUser, 'body'),
passport.authenticate('local',{session: false}),
async (req,res, next) =>{
   try{
      const user = req.user
      //create paylod
      const payload = {
         sub: user.uid,
         nickname: user.username
      }
      const token = jwt.sign(payload, config.secret)

    
    res.json({
      user,
      token
   })
   //res.redirect('/home')

   //la estrategia jwt aun no esta implementada
   }catch(error){
    next(error)
   }
})


module.exports = router