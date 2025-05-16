const { DataTypes } = require('sequelize');
const  sequelize  = require('../database');

const Request = sequelize.define('Request', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  required_skills: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'requests',
  timestamps: false
});

module.exports = Request;
