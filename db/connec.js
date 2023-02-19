const config = require('./../configuration/config')

const {Sequelize} = require ('sequelize');

//const setupModles= require('./models/index')
const setupModels = require('./models/index.js')
console.log(config.uriLink)
const sequelize = new Sequelize(config.uriLink,{
    //host: config.dbHost,
    dialect: 'mysql',
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: false,
        
      }

});

sequelize.authenticate().then( (e) =>{console.log('conectado con sequelize')}).catch(e=>{console.log(e)})

setupModels(sequelize);
//sequelize.sync()



module.exports = sequelize;