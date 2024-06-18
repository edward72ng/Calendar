const express = require('express')
const router = new express.Router()
const {models} = require('./../db/connec')
const AuthService = require('./../services/auth.services')
const authservice = new AuthService

router.get('/',async (req,res) =>{
    rsp = await models.sections.findAll()
    res.json(rsp)
})


router.put('/:sectionId',async (req, res)=>{
    const {sectionId} = req.params

    console.log(sectionId)
    const sectionGet = await models.sections.findByPk(sectionId)
    console.log('ACTUALIZANDO !!!!!!!!')
    const resp = await sectionGet.update(req.body)
    res.json(resp)
})

router.post('/',async (req, res)=>{
    if (req.headers.authorization){
        console.log('hay header authorization :D')
        console.log(req.headers.authorization)
        var token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        console.log(newToken)
        const pay = await authservice.getPayload(newToken)

        const body = req.body
        const resp = await models.sections.create({...body,userid: pay.sub})
        res.json(resp)
    }
    
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const section = await models.sections.findByPk(id)
    const data = section.destroy()

    res.json(data)
})

router.get('/all/with-task/:folderid', async (req, res) => {
    const {folderid} = req.params
    const data = await models.sections.findAll({
        where: {
            folderid: folderid
        },
        include: [{
            model: models.todo,
            as: 'tasksInSections',
            include: ['evento']
        }]
    })

    res.json(data)
}
)

module.exports = router