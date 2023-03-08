
const boom = require('@hapi/boom')
const id = require('faker/lib/locales/id_ID')
const { where, Op } = require('sequelize')
const sequelize = require('./../db/connec')
const {models} = require('./../db/connec')
const {createTaskNotification} = require('../utils/helpers/notifications.helper')
//const {Todo} = require('./../db/models/modelssequelize')
//
//EN QUERYS DE SEQUELIZE SE NOS ENVIA [DATA, METADATA]

class Todos { 
    constructor(){
        this.data = []
        //this.generate()
        //this.generatedb()
    }

    getToday() {
        const date = new Date().toISOString().slice(0, 10); 
        return date
    }

    async obtener() {
    
        this.data = await models.todo.findAll()//.then(res=>{console.log(res)}).catch(e=>{console.log(e)})
        return this.data
    }


    async prymari(folder){
        let obj = {
            tittle:"No Sections",
            data: []
        }
        const dat = await models.todo.findAll({
            where: {
                sectionid : null,
                folderid: folder
            }
        })
        obj = {
            sectionid: `folder-${folder}`,
            tittle:"No Sections",
            data: dat
        }
        return obj 
    }
    async mutable (arr){
        const res = []
        let obj;
        await Promise.all(
            arr.map(async(elem,i)=>{
                obj = {
                    sectionid:elem.id,
                    tittle: elem.section,
                    data: await models.todo.findAll({
                        where : {
                            sectionid:elem.id, 
                        }
                    })
                }
                res.push(obj)
            })
        )
        return res
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
                sectionid: 'all',
                tittle: "Todo",
                data: yourTodos,
                }
            ]
            return res

        }else if(folder){
            let folderId = parseInt(folder)
            let yourSections = await models.folders.findByPk(folderId,{
                include:['sectionsInFolder']
            })
            
            const res = await this.mutable(yourSections.sectionsInFolder)
            res.push(await this.prymari(folderId))
            return res
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
                include:['notifis','evento','myTags']
            })
            
            return yourTodos
        }else if(folder){
            let folderId = parseInt(folder)
            let yourTodos = await models.todo.findAll({
                where: {
                    userid: userId,
                    folderid: folderId
                },
                include:['notifis','evento','myTags']
            })
            
            return yourTodos
        }
       
    }

    async editYourTodo (idComp, objeto){
        console.log(objeto)
        let obj = objeto
        console.log(obj)
        //var obj = {content: objeto.content, details: objeto.details, folderid: objeto.folderid,  assignedto: objeto.assignedto}
        if(objeto.myTags){
            await Promise.all(
                objeto.myTags.map( async (elem) => {
                    await models.todotags.create({
                        todoid: idComp,
                        tagid: elem.id
                    })
                })
            )
            
        }
        
        
        if(objeto.event){
            const [evento, created] = await models.events.findOrCreate({
                where: sequelize.where(sequelize.col('event'),objeto.event),
                defaults: {
                    event: objeto.event
                }
            })
            obj = {content: objeto.content, deatails:objeto.deatails, eventid:evento.id}
        }
        var yourTodos = await models.todo.update(obj,{
            where:{
                id: idComp
            }
        }
        )

        if(objeto.notifications){
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
        }
        
        

        return yourTodos
    }
//sequelize.where(sequelize.col('event'),objeto.event)
    async createYourTodo (objeto, userId){
        const {event, notifications} = objeto
        
            if (event){
                const [eventObtained, created] = await models.events.findOrCreate({
                    where:{event : event},
                defaults: {
                    event: event,
                }}
                );
                objeto = {...objeto, eventid : eventObtained.id}
            };


            const newTodo = await models.todo.create({
                ...objeto,
                userid: userId},
                
                );

            if(notifications){
                    await notifications.map( async(elem)=>{
                        console.log(this.getToday())
                        if (elem.date == this.getToday()){
                            const payload = {
                                title: 'Nueva Alarma',
                                message: objeto.content
                            }

                            const userData = await models.usuarios.findByPk(userId, {
                                include: [{
                                    model: models.subscriptions,
                                    as: 'subscriptions',
                                    include: ['keys']
                                }]
                            })
                            await Promise.all(
                                userData.subscriptions.map(async (val)=>{
                                    await createTaskNotification(elem.date, elem.time, {endpoint: val ,payload: payload})
                                })
                            )
                            

                            

                        }

                        await models.notifications.create(
                            {
                                ...elem,
                                todoid: newTodo.id,
                            }, 
                        );
                    })
            };


            if(objeto.myTags){
                await Promise.all(
                    objeto.myTags.map( async (elem) => {
                        await models.todotags.create({
                            todoid: newTodo.id,
                            tagid: elem.id
                        })
                    })
                )
                
            }
            
        ;
        //
        return newTodo
        
    }

    async deleteYourTodo (id){
        var elementTodo = await this.obteneruno(id)
        await elementTodo.destroy()
   
        return id
    }

    async getOne (id){
        const block = await models.todo.findOne({
            attributes: ['id', 'content', 'details'],
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