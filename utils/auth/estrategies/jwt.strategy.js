const {Strategy, ExtractJwt} = require('passport-jwt')
const config = require('./../../../configuration/config')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
   
}

const jwtEstrategy = new Strategy(options,(payload, done)=>{
    return done(null, payload)
})



module.exports = {jwtEstrategy}