const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateAdmin = require('../middleware/authAdmin');

// مسار التسجيل
router.post('/signup', adminController.signup);

// مسار تسجيل الدخول
router.post('/login', adminController.login);

// مسار محمي يتم التحقق فيه من صلاحيات المسؤول
router.get('/dashboard', authenticateAdmin, (req, res) => {
  res.send('Welcome to Admin Dashboard');
});

module.exports = router;
