const passport = require('passport')

const {localEstrategy} = require('./estrategies/local.strategy')
//const {localEstrategy} = require('./strategies/local.strategy')
const {jwtEstrategy} = require('./estrategies/jwt.strategy')

passport.use(localEstrategy)
passport.use(jwtEstrategy)