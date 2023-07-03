const { config } = require('../config/config');


/**Variables protecte */
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const { dbPort, dbName, dbHost } = config;

/**Databse connection URL */
const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: config.db_url,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
