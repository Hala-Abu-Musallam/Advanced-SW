const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;

// 1. الاتصال بقاعدة البيانات
const sequelize = require('./database');
require('dotenv').config();
// 2. تحميل النماذج (المهم للعلاقات)
require('./models/user'); // يتم تنفيذ ملف النموذج
require('./models/userRole');
require('./models/payment');

// 3. تحميل الروتات
const authRoutes = require('./routes/authroutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


// 4. Middleware الأساسية
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. الروتات
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);

// 6. راوت الاختبار
app.get('/', (req, res) => {
  res.send('🚀 Welcome to HopeConnect API!');
});

// 7. معالجة الأخطاء (يجب أن تكون في النهاية)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 8. بدء الخادم
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL database.');

    // استخدم force: true فقط للتنمية (سيحذف جميع الجداول!)
    // alter: true يحاول تحديث الجداول بدون حذف البيانات
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables synchronized.');

    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server startup error:', err);
    process.exit(1);
  }
}

startServer();