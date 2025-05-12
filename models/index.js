const { Sequelize } = require('sequelize');
const AdminModel = require('./admin');  // استيراد نموذج Admin من داخل مجلد modules

// إعداد الاتصال بقاعدة البيانات
const sequelize = new Sequelize(
  process.env.DB_NAME,  // اسم قاعدة البيانات من .env
  process.env.DB_USER,  // اسم المستخدم من .env
  process.env.DB_PASSWORD,  // كلمة المرور من .env
  {
    host: process.env.DB_HOST,  // المضيف من .env
    dialect: 'mysql',  // نوع قاعدة البيانات (مثال: MySQL)
  }
);

// تعريف النماذج
const Admin = AdminModel(sequelize, Sequelize.DataTypes);

// تصدير الاتصال والنماذج
module.exports = { sequelize, Admin };
