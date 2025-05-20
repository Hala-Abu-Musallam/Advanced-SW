// ✅ index.js (نسخة حلا مع الحفاظ على شغل الفريق)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route imports
const authRoutes = require('./routes/authroutes');
const adminRoutes = require('./routes/adminroutes');
const donationRoutes = require('./routes/donationroutes');
const trustRoutes = require('./routes/trustRoutes');
const volunteerRoutes = require('./routes/volunteer');
const notificationRoutes = require('./routes/notificationRoutes');
const requestRoutes = require('./routes/requestRoutes');
const logisticsRoutes = require('./routes/logisticsRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/trust', trustRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/logistics', logisticsRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('✅ HopeConnect API is running');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Sequelize DB setup
const db = require('./models');
const sequelize = db.sequelize;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('📦 Models synced with DB');

    // Start server
    const PORT = process.env.PORT || 8081;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB sync failed:', err);
  });
