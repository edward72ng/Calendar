//EXPORTACION DENUESTROS MODELOS
const { Todoe, schemaTodoSeq } = require('./todoModel')
const { Notify, schemaNotifySeq} = require('./notifyModel')
const { Notifydate,schemaNotifydateSeq} = require('./notifydateModel')
const { Usuarios, schemaUserSeq} = require('./usuariosModel')
const { Events, schemaEventsSeq} = require('./events.model')
const { Notifications, schemaNotificationsSeq} = require('./notifications.model')
const { Folders, schemaFoldersSeq} = require('./folders.model')
const { Sections, schemaSectionsSeq} = require('./sections.model')
const { Assignments, schemaAssignmentsSeq} = require('./assignments.model')
const { Contacts, schemaContactsSeq} = require('./contacts.model')
const { Pending, schemaPendingSeq} = require('./pendingNotifications.model')
const { Subscriptions, schemaSubscriptionsSeq} = require('./subscriptions.model')
const { Keys, schemaKeysSeq} = require('./keys.model')
const { Orders, schemaOrdersSeq} = require('./orders.model')

// INICIACION DE MODELOS PARA EXPORTAR
function setupModels(sequelize) {
    Todoe.init(schemaTodoSeq,Todoe.config(sequelize) )
    Notify.init(schemaNotifySeq,Notify.config(sequelize) )
    Notifydate.init(schemaNotifydateSeq,Notifydate.config(sequelize) )
    Usuarios.init(schemaUserSeq, Usuarios.config(sequelize))
    Events.init(schemaEventsSeq, Events.config(sequelize))
    Notifications.init(schemaNotificationsSeq, Notifications.config(sequelize))
    Folders.init(schemaFoldersSeq, Folders.config(sequelize))
    Sections.init(schemaSectionsSeq, Sections.config(sequelize))
    Assignments.init(schemaAssignmentsSeq, Assignments.config(sequelize))
    Contacts.init(schemaContactsSeq, Contacts.config(sequelize))
    Pending.init(schemaPendingSeq, Pending.config(sequelize))
    Subscriptions.init(schemaSubscriptionsSeq, Subscriptions.config(sequelize))
    Keys.init(schemaKeysSeq, Keys.config(sequelize))
    Orders.init(schemaOrdersSeq, Orders.config(sequelize))

    Todoe.associate(sequelize.models)
    Notify.associate(sequelize.models)
    Usuarios.associate(sequelize.models)
    Events.associate(sequelize.models)
    Notifications.associate(sequelize.models)
    Folders.associate(sequelize.models)
    Sections.associate(sequelize.models)
    Subscriptions.associate(sequelize.models)
    Keys.associate(sequelize.models)
    Orders.associate(sequelize.models)
}


module.exports = setupModels