module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    trustId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Review;
};
