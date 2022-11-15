const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('./../configuration/config')


router.post('/login',
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
   }catch(error){
    next(error)

   }
})


module.exports = router