const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');

dotenv.config();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authroutes');
const adminRoutes = require('./routes/adminroutes');
const donationRoutes = require('./routes/donationroutes');
const revenueRoutes = require('./routes/revenueroutes'); // ✅ أضفنا الراوت الجديد

// Default route
app.get('/', (req, res) => {
  res.send('💡 HopeConnect API is running');
});

// Use routes
app.use('/api/auth', authRoutes);         
app.use('/api/admin', adminRoutes);        
app.use('/api/donations', donationRoutes); 
app.use('/api/info', revenueRoutes);       // ✅ استخدم الراوت الجديد

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Global Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
