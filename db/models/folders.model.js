const {Sequelize ,DataTypes, Model, INTEGER} = require('sequelize')


const FOLDERS_TABLE = 'folders'

const schemaFoldersSeq = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
     },
    userid: {
        type: INTEGER.UNSIGNED,
    }
  }

class Folders extends Model{

    static associate (models){
        this.hasMany(models.todo, {
            as: 'blocsInFolder',
            foreignKey: 'folderid' //un evento puede tener muchos todos
        })
    }

    static config(sequelize){
        return{
            sequelize,//conneccion con sequelize
            modelName: FOLDERS_TABLE
        }
    }
}

module.exports = {FOLDERS_TABLE ,Folders, schemaFoldersSeq}