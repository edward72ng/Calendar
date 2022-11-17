const {models} = require('./../db/connec')
const jwt = require('jsonwebtoken')
const config = require('./../configuration/config')

class Auth{
    constructor(){
        this.data = []
    }

    async getPayload(token) {
        const payload = await jwt.verify(token, config.secret)
        return payload
    }
}

module.exports = Auth