module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'admin'
    }
  }, {
    tableName: 'admins'  // تأكد من أن اسم الجدول صحيح
  });

  return Admin;
};
