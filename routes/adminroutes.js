const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');

// middlewares
const { authenticateToken } = require('../middlewares/authMiddleware');
const verifyAdmin = require('../middlewares/adminMiddleware');

// حماية كل راوت: لازم المستخدم يكون مسجل دخول وأدمن
router.use(authenticateToken); // يتحقق من صحة التوكن
router.use(verifyAdmin);       // يتحقق أن الدور "admin"

// @route   GET /admin/users
// @desc    Get all users (only for admin)
// @access  Admin
router.get('/users', adminController.getAllUsers);

// @route   DELETE /admin/users/:id
// @desc    Delete user by ID (only for admin)
// @access  Admin
router.delete('/users/:id', adminController.deleteUser);

// ممكن تضيف راوتات أخرى مثل:
// router.put('/users/:id/role', adminController.updateUserRole);

module.exports = router;
