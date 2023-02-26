const {Sequelize ,DataTypes, Model} = require('sequelize')


const EVENTS_TABLE = 'events'

const schemaEventsSeq = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
      },
    event: {
        type: DataTypes.DATEONLY,
        allowNull: false,
     },
  }

class Events extends Model{

    static associate (models){
        this.hasMany(models.todo, {
            as: 'tareas',
            foreignKey: 'eventid' //un evento puede tener muchos todos
        })

    }

    static config(sequelize){
        return{
            sequelize,//conneccion con sequelize
            modelName: EVENTS_TABLE
        }
    }
}

module.exports = {EVENTS_TABLE ,Events, schemaEventsSeq}