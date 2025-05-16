module.exports = (sequelize, DataTypes) => {
    const Donation = sequelize.define('Donation', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: DataTypes.INTEGER,
      type: DataTypes.STRING, 
      amount: DataTypes.FLOAT,
      category: DataTypes.STRING, 
      status: DataTypes.STRING 
    }, {
      tableName: 'donations',
      timestamps: true
    });
  
    return Donation;
  };
  