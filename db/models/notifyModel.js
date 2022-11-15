const {Sequelize ,DataTypes, Model} = require('sequelize')

const NOTIFY_TABLE = 'notify'

const schemaNotifySeq = {

    nid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
      },
     date: {
         type: DataTypes.STRING,
         allowNull: false
      },
     
  }

class Notify extends Model{

    static associate(models)
    {
        // this.hasMany(models.notifydate,{
        //     foreignKey: 'notifyid',
        //     as: 'todonotify', })
        this.belongsToMany(models.todo,{
            as: 'todonotify',
            through: models.notifydate,
            foreignKey: 'notifyid',
            otherKey: 'todoid'
        })
}

    static config(sequelize){
        return{
            sequelize,//conneccion con sequelize
            modelName: NOTIFY_TABLE
        }
    }
} 

module.exports = {NOTIFY_TABLE ,Notify, schemaNotifySeq}