const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); // لتحميل المتغيرات من .env

// Middlewares
app.use(express.json()); // يدعم استقبال JSON من الطلبات

// Routes
const authRoutes = require('./routes/authroutes');
const adminRoutes = require('./routes/adminroutes');

// Home Route
app.get('/', (req, res) => {
  res.send('💡 Welcome to HopeConnect API - Backend for Orphan Support');
});

// Use routes
app.use('/api/auth', authRoutes);     // تسجيل دخول وتسجيل
app.use('/api/admin', adminRoutes);   // راوتات الأدمن فقط

// Global error handler (اختياري)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Server setup
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
