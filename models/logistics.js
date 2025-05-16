// File: models/logistics.js
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
  currentLatitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  currentLongitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  deliverySchedule: {
    type: DataTypes.JSON,
    allowNull: true, // Stores pickup and delivery time slots, e.g., { pickup: "2025-05-17T10:00:00Z", delivery: "2025-05-17T14:00:00Z" }
  },
});

module.exports = Logistics;