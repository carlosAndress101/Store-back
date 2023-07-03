const { Sequelize } = require('sequelize')
const { config } = require('../config/config')
const { setupModels } = require('../db/models/index')


const options = {
  dialect: 'postgres',
  logging: config.isProd ? false: true,
}
if(config.isProd){
  options.dialectOptions = {
    ssl:{
      rejectUnauthorized: false,
    }
  }
}

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const { dbPort, dbName, dbHost } = config;
/**Databse connection URL */
const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(config.db_url ? config.db_url : URI , options);


/**send the connection to setupModels */
setupModels(sequelize);

module.exports = sequelize
