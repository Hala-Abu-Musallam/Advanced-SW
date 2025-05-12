const { Sequelize } = require('sequelize');
require('dotenv').config();

<<<<<<< HEAD
const sequelize = new Sequelize('hopeconnect', 'root', 'advancedsoftware', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});
=======
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
    .then(() => console.log('✅ Connected to MySQL database'))
    .catch((err) => console.error('❌ Failed to connect to DB:', err));
>>>>>>> eec90ec574e9b9d9a1126c4d70f4bbedfcff62b5

module.exports = sequelize;
