const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const db = require('./models');
const sequelize = db.sequelize;

sequelize.sync()
  .then(() => console.log('📦 Models synced with DB'))
  .catch((err) => console.error('❌ Sync failed:', err));

app.use(express.json());

const trustRoutes = require('./routes/trustRoutes');
app.use('/api/trust', trustRoutes);

app.get('/', (req, res) => {
  res.send('✅ HopeConnect API is running');
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
