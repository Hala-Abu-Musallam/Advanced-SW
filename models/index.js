const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// ✅ استدعاء ملف الاتصال من مجلد أعلى
const sequelize = require(path.join(__dirname, '..', 'database'));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Trust = require('./trust')(sequelize, DataTypes);
db.Review = require('./review')(sequelize, DataTypes);

// ✅ العلاقات
db.Trust.hasMany(db.Review, { foreignKey: 'trustId', onDelete: 'CASCADE' });
db.Review.belongsTo(db.Trust, { foreignKey: 'trustId' });

module.exports = db;