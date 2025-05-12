const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'Payment123456';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // التحقق من وجود الهيدر وصيغة Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log("🔐 Received Token:", token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Token Error:", err);

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired. Please login again.' });
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token. Please login again.' });
    }

    return res.status(500).json({ success: false, message: 'Token verification failed', error: err.message });
  }
};
