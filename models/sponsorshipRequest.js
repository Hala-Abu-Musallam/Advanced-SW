const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Orphan = require('./orphan');

const SponsorshipRequest = sequelize.define('SponsorshipRequest', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orphan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Orphan,
      key: 'id'
    }
  },
  sponsorName: {
    type: DataTypes.STRING,
    allowNull: false,
      field: 'sponsor_name'

  },
  sponsorEmail: {
    type: DataTypes.STRING,
    allowNull: false,
      field: 'sponsor_email'

  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'sponsorship_requests',
  timestamps: true
});

Orphan.hasMany(SponsorshipRequest, { foreignKey: 'orphanId' });
SponsorshipRequest.belongsTo(Orphan, { foreignKey: 'orphanId' });

module.exports = SponsorshipRequest;