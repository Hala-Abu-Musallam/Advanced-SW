const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

const authRoutes = require('./routes/authroutes');
const adminRoutes = require('./routes/adminroutes');

app.get('/', (req, res) => {
    res.send('💡 HopeConnect API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log('✅ Server running at http://localhost:${PORT}');
});