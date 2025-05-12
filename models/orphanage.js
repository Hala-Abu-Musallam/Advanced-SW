module.exports = (sequelize, DataTypes) => {
    const Orphanage = sequelize.define('Orphanage', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      verified: DataTypes.BOOLEAN
    }, {
      tableName: 'orphanages',
      timestamps: false
    });
  
    return Orphanage;
  };
  