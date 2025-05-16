module.exports = (sequelize, DataTypes) => {
  const Trust = sequelize.define('Trust', {
    ngoName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mission: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Trust;
};
