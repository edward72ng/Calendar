const {Sequelize ,DataTypes, Model, INTEGER} = require('sequelize')
const {COLORS_TABLE} = require('./color.models')

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
    },
    colorid: {
        type: INTEGER.UNSIGNED,

        allowNull: false,
        references: {
            model: COLORS_TABLE,
            key: 'id'
          }
    },
    collaborative:{
        type: DataTypes.BOOLEAN,
        default: false
    }
  }

class Folders extends Model{

    static associate (models){
        this.hasMany(models.todo, {
            as: 'blocsInFolder',
            foreignKey: 'folderid' //un evento puede tener muchos todos
        })

        this.hasMany(models.sections, {
            as: 'sectionsInFolder',
            foreignKey: 'folderid' //un evento puede tener muchas secciones
        })

        this.belongsTo(models.colors,{
            foreignKey: 'colorid',
            as: 'myColor'
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