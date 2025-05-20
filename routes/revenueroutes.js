const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenuecontroller');
const { authenticateToken } = require('../middleware/authmiddleware');
const verifyAdmin = require('../middleware/adminmiddleware');

router.get('/revenue/total', authenticateToken, verifyAdmin, revenueController.getTotalRevenue);
router.get('/revenue/breakdown', authenticateToken, verifyAdmin, revenueController.getRevenueBreakdown);

module.exports = router;
