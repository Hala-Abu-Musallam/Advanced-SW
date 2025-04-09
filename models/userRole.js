const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const UserRole = sequelize.define('UserRole', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  role_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'userroles',
  timestamps: false
});

// علاقة بين UserRole و User
User.hasOne(UserRole, { foreignKey: 'username', sourceKey: 'username' });
UserRole.belongsTo(User, { foreignKey: 'username', targetKey: 'username' });

module.exports = UserRole;
