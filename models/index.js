const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = require(path.join(__dirname, '..', 'database'));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Trust = require('./trust')(sequelize, DataTypes);
db.Review = require('./review')(sequelize, DataTypes);


db.Trust.hasMany(db.Review, { foreignKey: 'trustId', onDelete: 'CASCADE' });
db.Review.belongsTo(db.Trust, { foreignKey: 'trustId' });

module.exports = db;
