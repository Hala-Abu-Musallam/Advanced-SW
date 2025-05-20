const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const Donation = sequelize.define('Donations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'ID'
    },
    onDelete: 'CASCADE'
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  platform_fee: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  category: {
    type: DataTypes.STRING(50)
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'pending'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'donations',
  timestamps: false,

  hooks: {
    beforeCreate: (donation) => {
      const fee = parseFloat((donation.amount * 0.02).toFixed(2));
      donation.platform_fee = fee;
    }
  }
});

Donation.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Donation, { foreignKey: 'user_id' });

module.exports = Donation;
