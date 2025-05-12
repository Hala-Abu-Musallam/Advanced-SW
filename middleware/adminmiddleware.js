const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || '2002';

// فقط للتحقق من التوكن وأنه أدمن
const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access token required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // تأكد أن الدور Admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access only' });
        }

        req.user = decoded; // نخزن البيانات في الطلب
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = verifyAdmin;
