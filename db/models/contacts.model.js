const {Sequelize ,DataTypes, Model} = require('sequelize')
const {USUARIOS_TABLE} = require('./usuariosModel')

const CONTACTS_TABLE = 'contacts'

const schemaContactsSeq = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
      },
    personid: {
        type: DataTypes.INTEGER,
        references: {
            model: USUARIOS_TABLE,
            key: 'uid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
     },
    contactid: {
        type: DataTypes.INTEGER,
        references: {
            model: USUARIOS_TABLE,
            key: 'uid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
     },
  }

class Contacts extends Model{

    static associate (models){
        

    }

    static config(sequelize){
        return{
            sequelize,//conneccion con sequelize
            modelName: CONTACTS_TABLE
        }
    }
}

module.exports = {CONTACTS_TABLE , Contacts, schemaContactsSeq}