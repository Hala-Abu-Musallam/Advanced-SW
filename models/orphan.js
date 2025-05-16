const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const Orphan = sequelize.define('Orphan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  educationStatus: {
    type: DataTypes.STRING
  },
  healthCondition: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING 
  }
}, {
  tableName: 'orphans',
  timestamps: true 
});


Orphan.createSponsorshipRequest = (requestData, callback) => {
  const query = "INSERT INTO sponsorship_requests (orphan_id, sponsor_name, sponsor_email, message) VALUES (?, ?, ?, ?)";
  sequelize.query(query, { replacements: [requestData.orphan_id, requestData.sponsor_name, requestData.sponsor_email, requestData.message] })
    .then(result => callback(null, result))
    .catch(err => callback(err));
};

Orphan.getSponsorshipRequests = (callback) => {
  const query = "SELECT * FROM sponsorship_requests";
  sequelize.query(query)
    .then(result => callback(null, result))
    .catch(err => callback(err));
};

Orphan.updateSponsorshipRequestStatus = (requestId, status, callback) => {
  const query = "UPDATE sponsorship_requests SET status = ? WHERE id = ?";
  sequelize.query(query, { replacements: [status, requestId] })
    .then(result => callback(null, result))
    .catch(err => callback(err));
};

module.exports = Orphan;
