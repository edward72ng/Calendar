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
        function isarrayVacio(arr) {
            if (arr.length === 0){
                return true
            }else{
            return false
            }
        }
        const prevData = await models.todo.findAll({
            include:['todonotify'],
            where: {
                userid: 1,
            }
        })
        var data = []
        prevData.map((arr)=>{
            if(isarrayVacio(arr.todonotify) == false){
                data.push(arr)
            }
        })
        
        return data
    }

    async getWithAssociationsNotify (){
        function isarrayVacio(arr) {
            if (arr.length === 0){
                return true
            }else{
            return false
            }
        }
        const prevData = await models.notify.findAll({
            include:['todonotify'],
            where: {
                
            }
        })
        const prevTwo =[]
        prevData.map((arr)=>{
            if(isarrayVacio(arr.todonotify) == false ){
                prevTwo.push(arr)
            }
        })
    
        prevTwo.sort((a,b)=>{
            return a.date - b.date
        })
        return prevTwo
    }

    async getTodoDate(valParam){
        function isarrayVacio(arr) {
            if (arr.length === 0){
                return true
            }else{
            return false
            }
        }
        const prevData = await models.todo.findAll({
            include:['todonotify'],
            where: {
                userId: 1
            }
        })
        const prevTwo =[]
        prevData.map((arr)=>{
            if(isarrayVacio(arr.todonotify) == false ){
                if(arr.todonotify[0].date == valParam){
                    prevTwo.push(arr)
                }
            }
        })
        return prevTwo
    }
}

module.exports = Notify