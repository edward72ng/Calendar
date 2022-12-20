const boom = require('@hapi/boom')

const {models} = require('../db/connec')
const { Op } = require("sequelize");
const sequelize = require('./../db/connec');
class Events{
    constructor(){
        this.data = []
    }

    async getAllEvents(userId, folder){
        if(!folder){
            const data = await models.todo.findAll({
                where: {
                    userid: userId,
                    eventid: {
                        [Op.not]: null
                    }
                },
                include: ['evento']
            })
        
            const send = [] 
            data.map((arr)=>{
                send.push(arr)
            })
            return send
        }else if(folder){
            const data = await models.todo.findAll({
                where: {
                    userid: userId,
                    eventid: {
                        [Op.not]: null
                    },
                    folderid: folder
                },
                include: ['evento']
            })
        
            const send = [] 
            data.map((arr)=>{
                send.push(arr)
            })
            return send
        }
    }
}

module.exports = Events