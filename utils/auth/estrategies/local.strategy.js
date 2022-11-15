const {Strategy} = require('passport-local')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const UserService = require('./../../../services/user.service')
const service = new UserService

const options = {
    usernameField: 'user',
    passwordField: 'password'
}

const localEstrategy = new Strategy(options ,async (email, password, done)=>{
    try{
        const user = await service.getByUser(email)
        if (!user){
            done(boom.unauthorized('User not found'),false)
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            done(boom.unauthorized('Incorrect password'),false)
        }
        done(null, user)
    }
    catch(error){
        done(error, false);
    }
})



module.exports = {localEstrategy}