const boom = require('@hapi/boom')
const config = require('./../configuration/config')


function authHeader(req, res, next){
    const key = req.headers['api']
    if (key !== config.apiKey) {
        next(boom.unauthorized());
      } else {
        next()
      }
}

module.exports = {authHeader}