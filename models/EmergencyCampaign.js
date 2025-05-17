module.exports = (sequelize, DataTypes) => {
  const EmergencyCampaign = sequelize.define("EmergencyCampaign", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    type: {
      type: DataTypes.ENUM('Food', 'Medical', 'Shelter', 'Psychological', 'Other'),
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('High', 'Medium', 'Low'),
      allowNull: false
    },
    targetAmount: { type: DataTypes.FLOAT, allowNull: false },
    currentAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
    deadline: { type: DataTypes.DATE, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  });

  return EmergencyCampaign;
};