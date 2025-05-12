module.exports = (sequelize, DataTypes) => {
    const Orphan = sequelize.define('Orphan', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      education_status: DataTypes.STRING,
      health_condition: DataTypes.STRING,
      profile_image: DataTypes.STRING
    }, {
      tableName: 'orphans',
      timestamps: false
    });
  
    return Orphan;
  };
  