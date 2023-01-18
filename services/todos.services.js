
const boom = require('@hapi/boom')
const id = require('faker/lib/locales/id_ID')
const { where } = require('sequelize')
const sequelize = require('./../db/connec')
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

    async get(userId, folder) {
        if(!folder){
            let yourTodos = await models.todo.findAll({
                where: {
                    userid: userId
                },
                include:['notifis','evento']
            })
            
            const res = [
                {
                tittle: "all",
                data: yourTodos,
                }
            ]
            return res
            
        }else if(folder){
            let folderId = parseInt(folder)
            let yourTodos = await models.todo.findAll({
                where: {
                    userid: userId,
                    folderid: folderId
                },
                include:['notifis','evento']
            })
            
            return yourTodos
        }
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

    async getYourTodos(userId, folder){
        if(!folder){
            let yourTodos = await models.todo.findAll({
                where: {
                    userid: userId
                },
                include:['notifis','evento']
            })
            
            return yourTodos
        }else if(folder){
            let folderId = parseInt(folder)
            let yourTodos = await models.todo.findAll({
                where: {
                    userid: userId,
                    folderid: folderId
                },
                include:['notifis','evento']
            })
            
            return yourTodos
        }
       
    }

    async editYourTodo (idComp, objeto){
        console.log(objeto)
        var obj = {content: objeto.content, deatails: objeto.deatails}
        if(objeto.event !== ""){
            const [evento, created] = await models.events.findOrCreate({
                where: sequelize.where(sequelize.col('event'),objeto.event),
                defaults: {
                    event: objeto.event
                }
            })
            var obj = {content: objeto.content, deatails:objeto.deatails, eventid:evento.id}
        }
        var yourTodos = await models.todo.update(obj,{
            where:{
                id: idComp
            }    }
        )

        if(objeto.notifications.length !== 0)
        
            await models.notifications.destroy({
                where: sequelize.where(sequelize.col('todoid'),idComp)
            })
        objeto.notifications.map(async (noti)=>{
            await models.notifications.create({
                todoid: idComp,
                date:noti.date,
                time:noti.time,
            })
        })

        return yourTodos
    }

    async createYourTodo (objeto, userId){
        if(objeto.event !== ""){
            const [evento, created] = await models.events.findOrCreate({
                where: sequelize.where(sequelize.col('event'),objeto.event),
                defaults: {
                    event: objeto.event
                }
            })
            var semd = {
                userid:userId,
                content: objeto.content,
                deatails: objeto.deatails,
                eventid: evento.id
            }
        }else{
            var semd = {
                userid:userId,
                content: objeto.content,
                deatails: objeto.deatails,
            }
        }
        const newTodo = await models.todo.create(semd)
        console.log(newTodo.id)
        if(objeto.notifications.length !== 0)
        objeto.notifications.map(async (noti)=>{
            await models.notifications.create({
                todoid: newTodo.id,
                date:noti.date,
                time:noti.time,
            })
        })
      
    }

    async deleteYourTodo (id){
        var elementTodo = await this.obteneruno(id)
        await elementTodo.destroy()
   
        return id
    }

    async getOne (id){
        const block = await models.todo.findOne({
            attributes: ['id', 'content', 'deatails'],
            where: {
                id:id
            },
            include: ['evento', 'notifis']
        })
        return (block)
    }
}

module.exports = Todos;
// var inb = new Inbox()
// inb.generate()
// console.log(inb.obtener())