const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Orphan = sequelize.define('Orphan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  educationStatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  healthCondition: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'orphans',
  timestamps: false,  
});
module.exports = Orphan;