const { Sequelize } = require("sequelize");
const config = require("./config.json");

const env = "development"; // Default to 'development'
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
  }
);

module.exports = sequelize;
