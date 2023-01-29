const {Sequelize ,DataTypes, Model} = require('sequelize')
const {TODO_TABLE} = require('./todoModel')

const NOTIFICATIONS_TABLE = 'notifications'

const schemaNotificationsSeq = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
      },
      date:{
        type: DataTypes.DATE
      },
      time: {
        type: DataTypes.TIME
      },
     todoid: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: TODO_TABLE, //aunque el parametro dice model, lo que se señala es la tabla
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
     }
  }

class Notifications extends Model{

    static associate (models){
        this.belongsTo(models.todo,{//una notifi puede tener un todo
            foreignKey: 'todoid', //aqui la fk es el eventid
            as: 'todo'
        })
    }

    static config(sequelize){
        return{
            sequelize,
            modelName: NOTIFICATIONS_TABLE
        }
    }
}

module.exports = {NOTIFICATIONS_TABLE , Notifications, schemaNotificationsSeq}