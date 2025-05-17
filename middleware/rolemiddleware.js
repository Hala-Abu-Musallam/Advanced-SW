
const allowRoles = (...allowedRoles) => {
    return (req, res, next) => {
  
      if (!req.user || !req.user.role) {
        return res.status(401).json({ message: 'Unauthorized: No role found' });
      }
  

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient role' });
      }
  

      next();
    };
  };
  
  module.exports = { allowRoles };
  