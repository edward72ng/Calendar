const boom = require('@hapi/boom')

const {models} = require('./../db/connec')

class Notify{
    constructor(){
        this.data = []
    }

    async obtener() {

        this.data = await models.notify.findAll()//.then(res=>{console.log(res)}).catch(e=>{console.log(e)})
        return this.data
    }


    async getWithAssociations (){
        this.data = await models.notify.findAll({
            include:['todonotify']
        })
        return this.data
    }
}

module.exports = Notify