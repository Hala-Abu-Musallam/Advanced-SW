module.exports = (sequelize, DataTypes) => {
    const Volunteer = sequelize.define('Volunteer', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: DataTypes.INTEGER,
      skill: DataTypes.STRING,
      availability: DataTypes.STRING,
      description: DataTypes.TEXT
    }, {
      tableName: 'volunteers',
      timestamps: false
    });
  
    return Volunteer;
  };

  