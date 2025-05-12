const express = require('express');
const dotenv = require('dotenv');
const app = express();

// تحميل متغيرات البيئة
dotenv.config();

// Middlewares
app.use(express.json());

// ====== Routes ======
const authRoutes = require('./routes/authroutes');
const adminRoutes = require('./routes/adminroutes');
const donationRoutes = require('./routes/donationroutes');

// Test Route
app.get('/', (req, res) => {
  res.send('💡 HopeConnect API is running');
});

// استخدام الراوتات
app.use('/api/auth', authRoutes);          // تسجيل دخول وتسجيل
app.use('/api/admin', adminRoutes);        // راوتات الأدمن فقط
app.use('/api/donations', donationRoutes); // تبرعات

// Error handler (اختياري)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// بدء الخادم
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
