const config = require('./../configuration/config')

const {Sequelize} = require ('sequelize');

//const setupModles= require('./models/index')
const setupModels = require('./models/index.js')

const sequelize = new Sequelize(config.uriLink,{
//const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword,{
  
    //host: config.dbHost,
    
    dialect: 'mysql',
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: false,
        
      },
      pool: {
        max: 5, // Número máximo de conexiones en el pool
        min: 0, // Número mínimo de conexiones en el pool
        acquire: 30000, // Tiempo máximo que Sequelize intentará establecer la conexión antes de arrojar un error
        idle: 10000 // Tiempo máximo que una conexión puede estar inactiva antes de ser liberada
      }

});

sequelize.authenticate().then( (e) =>{console.log('conectado con sequelize')}).catch(e=>{console.log(e)})

setupModels(sequelize);


sequelize.sync()



module.exports = sequelize;