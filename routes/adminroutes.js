const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');
const { authenticateToken } = require('../middleware/authmiddleware');
const verifyAdmin = require('../middleware/adminmiddleware');

router.use(authenticateToken);
router.use(verifyAdmin);

router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);
router.get('/transparency', adminController.getTransparencyReport);


module.exports = router;
