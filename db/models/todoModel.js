const {Sequelize ,DataTypes, Model} = require('sequelize')


const {USUARIOS_TABLE} = require('./usuariosModel')
const {EVENTS_TABLE} = require('./events.model')
const { SECTIONS_TABLE } = require('./sections.model')
// const user = sequelize.define('users',{
//     uid:{
//         type: DataTypes.UUID,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// })

// const Todo = sequelize.define('todo',{
//     // id:{
//     //     type: DataTypes.UUID,
//     //     allowNull: false
//     // },
//     content: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     deatails: {
//         type: DataTypes.STRING
//     },
//     creation:{
//         type: DataTypes.STRING,
//         allowNull: false
//     },
    
//     //FK
//     // userid: {
//     //     type: DataTypes.INTEGER,
//     //     allowNull: false
//     // }
// },
// {
//     freezeTableName: true
// }
// )

// const notifydate = sequelize.define('notifydates',{
//     ndid:{
//         type: DataTypes.UUID,
//         allowNull: false
//     },

//     todid: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     notifyid: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     }
// })

// const notify = sequelize.define('notifys',{
//     nid:{
//         type: DataTypes.UUID,
//         allowNull: false
//     },
//     date: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// })

//Todo.findByPk(3).then(res=>{console.log(res)}).catch(e=>{console.log(e)})


//primer parametro: descripsion de tabla,campos
//segundo parametro: conneccion sequelize y model name

const TODO_TABLE = 'todo'

const schemaTodoSeq = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
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
     }
  }

class Todoe extends Model{

    static associate (models){
        //  this.hasMany(models.notifydate,{
        //      foreignKey: 'todoid',
        //      as: 'todonotify', 
        // })
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
    }

    static config(sequelize){
        return{

            sequelize,//conneccion con sequelize
            modelName: TODO_TABLE
        }
    }
}

//  Todoe.init(
//      {
//        content: {
//            type: DataTypes.STRING,
//             allowNull: false
//         },
//         deatails: {
//             type: DataTypes.STRING
//          },
//         sectionid:{
//              type: DataTypes.I,
//              allowNull: false
//          },
        
//      },
//      {
//         sequelize,
//         modelName: 'todo',
       
//      }
//  )

module.exports = {TODO_TABLE ,Todoe, schemaTodoSeq}
