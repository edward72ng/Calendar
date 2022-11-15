const {Sequelize ,DataTypes, Model} = require('sequelize')

const USUARIOS_TABLE = 'usuarios'

const schemaUserSeq = {

    uid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
      },
    user: {
         type: DataTypes.STRING,
         allowNull: false
      },
    password: {
        type: DataTypes.STRING,
        allowNull: false
     },
     
  }

class Usuarios extends Model{

    static associate(models)
    {
        // this.hasMany(models.notifydate,{
        //     foreignKey: 'notifyid',
        //     as: 'todonotify', })
        this.hasMany(models.todo,{
            foreignKey: 'userid',
            as: 'usertodo'
        })
}

    static config(sequelize){
        return{
            sequelize,//conneccion con sequelize
            modelName: USUARIOS_TABLE
        }
    }
} 

module.exports = {USUARIOS_TABLE, Usuarios, schemaUserSeq}