const config = require('./../configuration/config')

const {Sequelize} = require ('sequelize');

//const setupModles= require('./models/index')
const setupModels = require('./models/index.js')

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword,{
    host: config.dbHost,
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: false
      }
});

sequelize.authenticate().then(e=>{console.log('conectado con sequelize')}).catch(e=>{console.log(e)})

setupModels(sequelize);
//sequelize.sync()



module.exports = sequelize;