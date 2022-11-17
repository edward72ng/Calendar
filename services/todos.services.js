
const boom = require('@hapi/boom')
const { where } = require('sequelize')
const {models} = require('./../db/connec')
//const {Todo} = require('./../db/models/modelssequelize')
//
//EN QUERYS DE SEQUELIZE SE NOS ENVIA [DATA, METADATA]

class Todos { 
    constructor(){
        this.data = []
        //this.generate()
        //this.generatedb()
    }


    // generatedb(){
    //     connection.query(q,(error, resp )=>{
    //         if (error){
    //             console.log('Service error')
    //         }
    //         else{
    //             //console.log(resp)
    //             this.data = resp
    //         }
    //     })
    // }

    // generate(){
    //     const limit = 10;
    //     for (let index = 0; index < limit; index++) {
    //         if (index % 2 == 0)
    //         {
    //             this.data.push(
    //                 {
    //                     id: faker.datatype.uuid(),
    //                     content: faker.animal.dog(),
    //                     deatails: faker.commerce.product(),
    //                     creation: faker.date.month(),
    //                     notifydate: faker.date.future()
    //                 }
    //             )
    //         }
    //         if (index % 2 == 1)
    //         {
    //             this.data.push(
    //                 {
    //                     id: faker.datatype.uuid(),
    //                     content: faker.animal.dog(),
    //                     deatails: faker.commerce.product(),
    //                     creation: faker.date.month(),
    //                     //notifydate: faker.date.future()
    //                 }
    //             )
    //         }
    //     }
    // }
    async obtener() {
        //consulta a la db
        // this.generatedb()
        // return this.data
        this.data = await models.todo.findAll()//.then(res=>{console.log(res)}).catch(e=>{console.log(e)})
        return this.data
    }
    async postear(objeto) {
        var td = {
            //id: faker.datatype.uuid(),
            ...objeto
        } 
        // connection.query('',(e,r)=>{
        //     if (error){
        //         throw boom.badData()
        //     }
        //     else{
                
        //     }
        // })
        await models.todo.create(td)
        return td
    }

    async obteneruno(id){
        const todo = await models.todo.findByPk(id)
        if (!todo){
            next(boom.notFound( id +' no encontrado'))
        }
        return todo
    }

    async editar(idComp, objeto){
        var elementTodo = await this.obteneruno(idComp)

        var rta = await elementTodo.update(objeto) 
        return rta
    }

    async borar(id){
        var elementTodo = await this.obteneruno(id)
        await elementTodo.destroy()
   
        return id
    }
    
    async obtenerTdNtf(){
   
        var notify = await models.todo.findAll( {
            include:['todonotify']
        }
        )
        return notify
    }

    async getYourTodos(userId){
        var yourTodos = await models.todo.findAll({
            where: {
                userid: userId
            }
        })
        return yourTodos
    }

    async editYourTodo (idComp, objeto){
        var yourTodos = await models.todo.update({content: objeto.content},{
            where:{
                id: idComp
            }    }
        )
        return yourTodos
    }

    async createYourTodo (objeto, userId){
        var semd = {
            userid:userId,
            ...objeto
        }
        var yourTodos = await models.todo.create(semd)
    }

    async deleteYourTodo (id){
        var elementTodo = await this.obteneruno(id)
        await elementTodo.destroy()
   
        return id
    }
}

module.exports = Todos;
// var inb = new Inbox()
// inb.generate()
// console.log(inb.obtener())