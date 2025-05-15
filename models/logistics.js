const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Logistics = sequelize.define("Logistics", {
  donationType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pickupLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deliveryLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "In Transit", "Delivered"),
    defaultValue: "Pending",
  },
  volunteerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Logistics;
