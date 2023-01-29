const {Sequelize ,DataTypes, Model} = require('sequelize')
const {USUARIOS_TABLE} = require('./usuariosModel')
const {TODO_TABLE} = require('./todoModel')

const ASSIGNMENTS_TABLE = 'assignments'

const schemaAssignmentsSeq = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
      },
    userid: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: USUARIOS_TABLE,
            key: 'uid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
     },
     todoid: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: TODO_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
     },
  }

class Assignments extends Model{

    static associate (models){
        

    }

    static config(sequelize){
        return{
            sequelize,//conneccion con sequelize
            modelName: ASSIGNMENTS_TABLE
        }
    }
}

module.exports = {ASSIGNMENTS_TABLE , Assignments, schemaAssignmentsSeq}