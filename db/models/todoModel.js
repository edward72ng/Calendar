const {Sequelize ,DataTypes, Model} = require('sequelize')
const {USUARIOS_TABLE} = require('./usuariosModel')
const {EVENTS_TABLE} = require('./events.model')
const { SECTIONS_TABLE } = require('./sections.model')
const {PRIORITIES_TABLE} = require('./priorities.models')

const TODO_TABLE = 'todo'

const schemaTodoSeq = {
    id: {
        type: DataTypes.CHAR(36), //INTEGER.UNSIGNED
        allowNull: false,
        primaryKey: true,
        
        
      },
    content: {
        type: DataTypes.STRING,
         allowNull: false
     },
     details: {
         type: DataTypes.STRING
      },
     creation:{
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: '29112022'
      },
      userid:{
        type: DataTypes.INTEGER.UNSIGNED,

        references: {
            model: USUARIOS_TABLE, //aunque el parametro dice model, lo que se señala es la tabla
            key: 'uid'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      eventid:{
        type: DataTypes.INTEGER.UNSIGNED,

        references: {
            model: EVENTS_TABLE, //aunque el parametro dice model, lo que se señala es la tabla
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      folderid:{
        type: DataTypes.INTEGER.UNSIGNED,

        /*references: {
            model: EVENTS_TABLE,
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'*/
      },
     assignedto: {
        type: DataTypes.INTEGER,
     },
     sectionid: {
        type: DataTypes.INTEGER.UNSIGNED,

        references: {
            model: SECTIONS_TABLE, //aunque el parametro dice model, lo que se señala es la tabla
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
     },
     priorityid:{
        type: DataTypes.INTEGER.UNSIGNED,

        references: {
            model: PRIORITIES_TABLE, //aunque el parametro dice model, lo que se señala es la tabla
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
     },
    timeblockdate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    timeblockstart: {
        type: DataTypes.STRING,
        allowNull: true
      },
    timeblockend: {
        type: DataTypes.STRING,
        allowNull: true
      }
  }
  

class Todoe extends Model{

    static associate (models){
        this.belongsTo(models.usuarios,{//un todo puede tener un evento
            foreignKey: 'userid', //aqui la fk es el eventid
            as: 'user'
        }
        )
        
        this.belongsToMany(models.notify,{
             through: models.notifydate,
             foreignKey: 'todoid',
             otherKey: 'notifyid',
             as: 'todonotify',})
        this.belongsTo(models.events,{//un todo puede tener un evento
            foreignKey: 'eventid', //aqui la fk es el eventid
            as: 'evento'
        }
        )
        this.hasMany(models.notifications, {
            as: 'notifications',
            foreignKey: 'todoid' //un todo puede tener muchas notifi
        })
        this.belongsTo(models.folders,{//un todo puede tener un evento
            foreignKey: 'folderid', //aqui la fk es el eventid
            as: 'folder'
        }
        )

        this.belongsTo(models.sections,{
            as: 'tasksInSections',
            foreignKey: 'sectionid'
        })

        this.belongsToMany(models.tags,{
            through: models.todotags,
            foreignKey: 'todoid',
            otherKey: 'tagid',
            as: 'myTags'
        })

        this.belongsTo(models.priorities, {
            as: 'myPriority',
            foreignKey: 'priorityid'
        })

        this.hasMany(models.subtask, {
            as: 'mySubtasks',
            foreignKey: 'taskid',
            
        })

        this.hasMany(models.images, {
            foreignKey: 'todoid',
            as: 'myImages'
        })
    }

    static config(sequelize){
        return{

            sequelize,//conneccion con sequelize
            modelName: TODO_TABLE
        }
    }
}

module.exports = {TODO_TABLE ,Todoe, schemaTodoSeq}
