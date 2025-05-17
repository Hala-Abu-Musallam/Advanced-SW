const { DataTypes } = require('sequelize');
const  sequelize  = require('../database');
const Volunteer = require('./volunteer');

const Notification = sequelize.define('Notification', {
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'notifications',
  timestamps: false
});


Notification.belongsTo(Volunteer, {
  foreignKey: 'volunteer_id',
  onDelete: 'CASCADE'
});

module.exports = Notification;