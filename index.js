const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;

const sequelize = require('./database'); // الاتصال بقاعدة البيانات
const User = require('./models/user');
const UserRole = require('./models/userRole');
const authRoutes = require('./routes/authroutes');

// ميدل وير لقراءة JSON من body
app.use(express.json());

// راوتات
app.use('/api/auth', authRoutes);

// راوت اختبار
app.get('/', (req, res) => {
  res.send('🚀 Welcome to HopeConnect API!');
});

<<<<<<< HEAD
app.listen(PORT, () => {
  console.log(`Server hala Rawan israa on http://localhost:${PORT}`);
});
=======
// الاتصال بقاعدة البيانات وبدء السيرفر
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to MySQL database.');
    return sequelize.sync({ alter: true }); // لتحديث الجداول تلقائيًا
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });
>>>>>>> Hala
