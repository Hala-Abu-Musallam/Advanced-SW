// Middleware لحماية الراوتات حسب الدور
const allowRoles = (...allowedRoles) => {
    return (req, res, next) => {
      // تأكد أن المستخدم موجود وأن عنده role
      if (!req.user || !req.user.role) {
        return res.status(401).json({ message: 'Unauthorized: No role found' });
      }
  
      // تحقق إذا الدور ضمن الأدوار المسموحة
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient role' });
      }
  
      // مسموح
      next();
    };
  };
  
  module.exports = { allowRoles };
  