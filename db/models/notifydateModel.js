const {Sequelize ,DataTypes, Model} = require('sequelize')
const {TODO_TABLE} = require('./todoModel')
const {NOTIFY_TABLE} = require('./notifyModel')


const NOTIFY_DATE = 'notifydate'

const schemaNotifydateSeq = {
    ndid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
      },
     todoid: {
         type: DataTypes.INTEGER,
         allowNull: false,

         references: {
            model: TODO_TABLE,
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      notifyid: {
        type: DataTypes.INTEGER,
        allowNull: false,

        references: {
            model: NOTIFY_TABLE, //aunque el parametro dice model, lo que se señala es la tabla
            key: 'nid'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
     },
  }

class Notifydate extends Model{

    static associate (models){
        

    }

    static config(sequelize){
        return{
            sequelize,//conneccion con sequelize
            modelName: NOTIFY_DATE
        }
    }
}

module.exports = {NOTIFY_DATE ,Notifydate, schemaNotifydateSeq}