const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');
const { authenticateToken } = require('../middlewares/authMiddleware');
const verifyAdmin = require('../middlewares/adminMiddleware');

router.use(authenticateToken); 
router.use(verifyAdmin);       

router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
