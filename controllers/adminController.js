const { Admin } = require('..');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// للتسجيل
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // التأكد إذا كان المستخدم موجود بالفعل
    const admin = await Admin.findOne({
      where: { username }
    });

    if (admin) {
      return res.status(400).send('Admin already exists');
    }

    // تجزئة كلمة المرور قبل الحفظ
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      username,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    return res.status(201).send({ message: 'Admin created successfully', admin: newAdmin });
  } catch (err) {
    return res.status(500).send('Error: ' + err.message);
  }
};

// لتسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({
      where: { username }
    });

    if (!admin) {
      return res.status(404).send('Admin not found');
    }

    // مقارنة كلمة المرور المدخلة مع كلمة المرور المخزنة
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(400).send('Invalid password');
    }

    // توليد توكين JWT
    const token = jwt.sign({ id: admin.id, username: admin.username }, 'secret_key', { expiresIn: '1h' });

    return res.status(200).send({ message: 'Login successful', token });
  } catch (err) {
    return res.status(500).send('Error: ' + err.message);
  }
};
