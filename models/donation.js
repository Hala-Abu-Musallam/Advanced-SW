module.exports = (sequelize, DataTypes) => {
    const Donation = sequelize.define('Donation', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: DataTypes.INTEGER,
      type: DataTypes.STRING, // مثلا: 'money', 'clothes', 'food'
      amount: DataTypes.FLOAT,
      category: DataTypes.STRING, // مثلا: 'general', 'education', 'medical'
      status: DataTypes.STRING // مثلا: 'pending', 'delivered'
    }, {
      tableName: 'donations',
      timestamps: true
    });
  
    return Donation;
  };
  