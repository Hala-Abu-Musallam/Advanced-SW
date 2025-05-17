const express = require('express');
const dotenv = require('dotenv');
const app = express();


dotenv.config();


app.use(express.json());


const authRoutes = require('./routes/authroutes');
const adminRoutes = require('./routes/adminroutes');
const donationRoutes = require('./routes/donationroutes');


app.get('/', (req, res) => {
  res.send('💡 HopeConnect API is running');
});


app.use('/api/auth', authRoutes);         
app.use('/api/admin', adminRoutes);        
app.use('/api/donations', donationRoutes); 


app.use((err, req, res, next) => {
  console.error('❌ Global Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
