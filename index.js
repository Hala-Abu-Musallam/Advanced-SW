require('dotenv').config();  // تحميل المتغيرات من ملف .env

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminRoutes = require('./routes/adminRoutes');  // استيراد مسارات الـ admin

const app = express();
<<<<<<< HEAD
app.use(express.json());  // تحديد أن البيانات المرسلة ستكون في صيغة JSON

const PORT = process.env.PORT || 8081;
const JWT_SECRET = process.env.JWT_SECRET;  // استخدام المتغير من .env

// إضافة المسارات الخاصة بالـ admin
app.use('/api/admin', adminRoutes);

// Signup للمستخدمين العاديين
app.post('/api/auth/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // التحقق إذا كان المستخدم موجودًا بالفعل
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // تشفير كلمة السر قبل حفظها
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء مستخدم جديد
    const newUser = { username, email, password: hashedPassword, role: 'user' }; // إضافة role
    users.push(newUser);

    // إنشاء التوكن
    const token = jwt.sign({ username, email, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
    
    // إرسال الاستجابة
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: { token, username, email }
    });
});

// Login للمستخدمين العاديين
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    // البحث عن المستخدم
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // مقارنة كلمة السر المخزنة مع المدخلة
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // إنشاء التوكن للمستخدم
    const token = jwt.sign({ username: user.username, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    // إرسال الاستجابة
    res.json({
        success: true,
        message: 'Login successful',
        data: { token, username: user.username, email: user.email }
    });
});

// تشغيل الخادم على المنفذ المحدد
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
=======
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
    console.log(`✅ Server running at http://localhost:${PORT}`);
>>>>>>> eec90ec574e9b9d9a1126c4d70f4bbedfcff62b5
});
