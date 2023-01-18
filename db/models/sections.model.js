const {Sequelize ,DataTypes, Model, INTEGER} = require('sequelize')
const {FOLDERS_TABLE} = require('./folders.model')

const SECTIONS_TABLE = 'sections'

const schemaSectionsSeq = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
    section: {
        type: DataTypes.STRING,
        allowNull: false,
     },
    folderid: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: FOLDERS_TABLE, 
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
    }
  }

class Sections extends Model{

    static associate (models){
        this.hasMany(models.todo, {
            as: 'blocsInSection',
            foreignKey: 'sectionid' 
        })
    }

    static config(sequelize){
        return{
            sequelize,
            modelName: SECTIONS_TABLE
        }
    }
}

module.exports = {SECTIONS_TABLE, Sections, schemaSectionsSeq}