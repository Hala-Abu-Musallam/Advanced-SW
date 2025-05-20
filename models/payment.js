const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const Payment = sequelize.define('Payment', {
  ID: {
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
    }
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: {
        args: [0.01],
        msg: 'Amount must be at least 0.01'
      }
    }
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'USD',
    validate: {
      isIn: {
        args: [['USD', 'EUR', 'GBP']],
        msg: 'Currency must be USD, EUR or GBP'
      }
    }
  },
  stripe_payment_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      name: 'unique_stripe_payment',
      msg: 'Stripe payment ID must be unique'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'payments',
  timestamps: true
});

Payment.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Payment, { foreignKey: 'user_id' });

module.exports = Payment;