const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');
const { authenticateToken } = require('../middlewares/authmiddleware');
const verifyAdmin = require('../middlewares/adminmiddleware');

router.use(authenticateToken); // تحقق من التوكن
router.use(verifyAdmin);       // تحقق من أنه admin

router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
