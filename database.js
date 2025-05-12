const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hopeconnect', 'root', 'advancedsoftware', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;
