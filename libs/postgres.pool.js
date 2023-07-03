const { Pool } = require('pg')
const { config } = require('../config/config')


let URI = '';

if (config.db_url) {
  URI = config.db_url;
} else {

  /**Variables protecte */
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const { dbPort, dbName, dbHost } = config;
  /**Databse connection URL */
  URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;
}

const pool = new Pool({ connectionString: URI });

module.exports = pool;
