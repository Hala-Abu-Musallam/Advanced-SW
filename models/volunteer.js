const { DataTypes } = require('sequelize');
const  sequelize  = require('../database');

const Volunteer = sequelize.define('Volunteer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  skills: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'volunteers',
  timestamps: false
});

module.exports = Volunteer;
