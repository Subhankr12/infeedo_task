const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.DB_HOST,
    logging: false,
    dialect: 'mysql',
  }
);

module.exports = {
  sequelize,
};
