const {Sequelize ,DataTypes, Model} = require('sequelize')
const {USUARIOS_TABLE} = require('./usuariosModel')

const COLORS_TABLE = 'colors'

const schemaColorssSeq = {

    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
  }

class Colors  extends Model{

    static associate(models)
    {
        
    }

    static config(sequelize){
        return{
            sequelize,//conneccion con sequelize
            modelName: COLORS_TABLE
        }
    }
} 

module.exports = {COLORS_TABLE ,Colors, schemaColorssSeq}