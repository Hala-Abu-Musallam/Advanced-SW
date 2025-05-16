const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Logistics = require('./models/logistics'); 
const logisticsRoutes = require('./routes/logisticsRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/logistics', logisticsRoutes);

app.get('/', (req, res) => {
  res.send('💡 HopeConnect API is running');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

Logistics.sequelize.sync({ alter: true }) 
  .then(() => {
    const PORT = process.env.PORT || 8081;
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to sync DB:', err);
  });