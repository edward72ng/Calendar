//EXPORTACION DENUESTROS MODELOS
const { Todoe, schemaTodoSeq } = require('./todoModel')
const { Notify, schemaNotifySeq} = require('./notifyModel')
const { Notifydate,schemaNotifydateSeq} = require('./notifydateModel')
const { Usuarios, schemaUserSeq} = require('./usuariosModel')
const { Events, schemaEventsSeq} = require('./events.model')

// INICIACION DE MODELOS PARA EXPORTAR
function setupModels(sequelize) {
    Todoe.init(schemaTodoSeq,Todoe.config(sequelize) )
    Notify.init(schemaNotifySeq,Notify.config(sequelize) )
    Notifydate.init(schemaNotifydateSeq,Notifydate.config(sequelize) )
    Usuarios.init(schemaUserSeq, Usuarios.config(sequelize))
    Events.init(schemaEventsSeq, Events.config(sequelize))

    Todoe.associate(sequelize.models)
    Notify.associate(sequelize.models)
    Usuarios.associate(sequelize.models)
    Events.associate(sequelize.models)
}


module.exports = setupModels