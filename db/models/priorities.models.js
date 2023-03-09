const {Sequelize ,DataTypes, Model} = require('sequelize')
const {USUARIOS_TABLE} = require('./usuariosModel')

const PRIORITIES_TABLE = 'priorities'

const schemaPrioritiesSeq = {

    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
    },
    prioriti: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color : {
        type: DataTypes.STRING,
        allowNull: false,
    }
     
  }

class Priorities  extends Model{

    static associate(models)
    {
        
    }

    static config(sequelize){
        return{
            sequelize,//conneccion con sequelize
            modelName: PRIORITIES_TABLE
        }
    }
} 

module.exports = {PRIORITIES_TABLE ,Priorities, schemaPrioritiesSeq}