const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const {models} = require('./../db/connec')

class UsuariosService{
    constructor(){
        this.data = []
    }

    async getting() {

        this.data = await models.usuarios.findAll()//.then(res=>{console.log(res)}).catch(e=>{console.log(e)})
        return this.data
    }

    async getOne (id){
        const rsp = await models.usuarios.findByPk(id)

        return rsp
    }

    async getByUser (user){
        const rsp = await models.usuarios.findOne({
            where: {user}
        })

        return rsp
    }

    async getWithAssociations (){
        this.data = await models.usuarios.findAll({
            include:['usertodo']
        })
        return this.data
    }

    
    async createUser (userObj){
        const crear = userObj;
        const pass = crear.password
        //console.log(bcrypt.hash(pass, 10))
        crear.password = await bcrypt.hash(pass, 10)
        const rsp = await models.usuarios.create(crear)
        return rsp
    }

    async deleteUser (id){
        const user = await this.getOne(id)
        await user.destroy()
        return {
            error: false,
            id: id,
            message: 'user with id: '+ id +' is a delete'
        }
    }

    async update(id, newUser){
        var user = await this.getOne(id)
        newUser.password  = await bcrypt.hash(newUser.password,10)
        var rta = await user.update(newUser) 
        return rta
    }

    async searchContacts (value) {
        const val = value.toLowerCase()
        const users = await models.usuarios.findAll({
            attributes: ['user', 'uid']
        })
        const data = users.filter((elem)=>{
            const name = elem.user.toLowerCase()
            return name.includes(val)
        })
        return data
    }

    async getMyNotifications (userId) {
        const data = await models.usuarios.findAll({
            where: {
                uid : userId
            },
            include: ['myNotifications']
        })
        return data[0].myNotifications
    }

}

module.exports = UsuariosService