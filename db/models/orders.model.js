const {Sequelize ,DataTypes, Model} = require('sequelize')
const {SECTIONS_TABLE} = require('./sections.model')
const ORDERS_TABLE = 'orders'

const schemaOrdersSeq = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
      },
    ordersection: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    sectionid: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: SECTIONS_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
     },
  }

class Orders extends Model{

    static associate (models){
        this.belongsTo(models.sections,{
            foreignKey: 'sectionid',
            as: 'myOrder'
        })
    }

    static config(sequelize){
        return{
            sequelize,//conneccion con sequelize
            modelName: ORDERS_TABLE
        }
    }
}

module.exports = {ORDERS_TABLE , Orders, schemaOrdersSeq}