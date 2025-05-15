const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../database');
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || '2002';

// تسجيل الدخول
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // جلب المستخدم
        const users = await sequelize.query(
            'SELECT * FROM users WHERE username = ?',
            {
                replacements: [username],
                type: sequelize.QueryTypes.SELECT
            }
        );

        const user = users[0];
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // تحقق من كلمة المرور
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // جلب الدور من جدول userroles
        const roles = await sequelize.query(
            'SELECT role_name FROM userroles WHERE username = ?',
            {
                replacements: [username],
                type: sequelize.QueryTypes.SELECT
            }
        );

        const role = roles.length > 0 ? roles[0].role_name : null;

        // إنشاء التوكن
        const token = jwt.sign(
            {
                ID: user.ID,
                username: user.username,
                email: user.email,
                role
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                username: user.username,
                email: user.email,
                role
            }
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
};

// التسجيل
exports.signup = async (req, res) => {
    const { username, email, password, role_name, description } = req.body;

    try {
        const existingUsers = await sequelize.query(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            {
                replacements: [username, email],
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (existingUsers.length > 0) {
            const existingUser = existingUsers[0];
            if (existingUser.username === username) {
                return res.status(400).json({ success: false, message: 'Username already exists' });
            } else {
                return res.status(400).json({ success: false, message: 'Email already exists' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // إضافة المستخدم
        await sequelize.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            {
                replacements: [username, email, hashedPassword],
                type: sequelize.QueryTypes.INSERT
            }
        );

        // إضافة الدور للمستخدم
        await sequelize.query(
            'INSERT INTO userroles (username, role_name, description) VALUES (?, ?, ?)',
            {
                replacements: [username, role_name, description],
                type: sequelize.QueryTypes.INSERT
            }
        );

        // إنشاء التوكن بعد التسجيل
        const token = jwt.sign(
            {
                username,
                email,
                role: role_name
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                username,
                email,
                role: role_name
            }
        });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, message: 'An error occurred during signup' });
    }
};