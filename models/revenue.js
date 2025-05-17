// models/Revenue.js
module.exports = (sequelize, DataTypes) => {
    const Revenue = sequelize.define('Revenue', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      source: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      tableName: 'revenues',
      timestamps: false
    });
  
    return Revenue;
  };
  