const jwt = require('jsonwebtoken');

// تحقق من صلاحيات المسؤول
const authenticateAdmin = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Token is required');
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid or expired token');
    }

    req.admin = decoded; // تخزين بيانات المسؤول في الكائن req
    next();
  });
};

module.exports = authenticateAdmin;
