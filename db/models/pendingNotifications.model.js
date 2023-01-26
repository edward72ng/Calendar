const {Sequelize ,DataTypes, Model} = require('sequelize')
const {USUARIOS_TABLE} = require('./usuariosModel')

const PENDING_TABLE = 'pendingnotifications'

const schemaPendingSeq = {

    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
      },
    message: {
         type: DataTypes.STRING,
         allowNull: false
      },
    userid : {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,

        references: {
            model: USUARIOS_TABLE, //aunque el parametro dice model, lo que se señala es la tabla
            key: 'uid'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
    },
    origin : {
      type: DataTypes.INTEGER
    }
     
  }

class Pending  extends Model{

    static associate(models)
    {
        
    }

    static config(sequelize){
        return{
            sequelize,//conneccion con sequelize
            modelName: PENDING_TABLE
        }
    }
} 

module.exports = {PENDING_TABLE ,Pending, schemaPendingSeq}