const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
);


sequelize.authenticate()
  .then(() => console.log('✅ Connected to MySQL database successfully.'))
  .catch(err => console.error('❌ Unable to connect to the database:', err));

module.exports = sequelize;
