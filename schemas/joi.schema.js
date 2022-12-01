const joi = require('joi')

const id = joi.number()
const content = joi.string().min(1).max(50)
const details = joi.string().max(100)
const notifydate = joi.string().max(50)
const creation = joi.string().min(1).max(50)
const user = joi.string().max(20)
const password = joi.string().max(20)
const event = joi.date

const createTodo = joi.object({
    content: content.required(),
    deatails: details,
    notifydate: notifydate,
    creation: creation,
    userid: id.required(),
})

const updateTodo = joi.object({
    content: content,
    deatails: details,
    notifydate: notifydate,
    creation: creation
})

const idTodo = joi.object({
    id: id.required(),
})

//Uservalidations
const createUser = joi.object({
    user: user.required(),
    password: password.required(),
})

module.exports= {createUser ,createTodo ,updateTodo,idTodo}