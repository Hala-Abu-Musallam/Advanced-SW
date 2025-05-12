const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationcontroller');

// Middlewares
const { authenticateToken } = require('../middleware/authmiddleware');
const { allowRoles } = require('../middleware/rolemiddleware');

// 🟡 تأكد من وجود توكن
router.use(authenticateToken);

// 📌 1. إنشاء تبرع جديد → فقط للمستخدمين اللي دورهم donor
router.post('/', allowRoles('donor'), donationController.createDonation);

// 📌 2. عرض التبرعات الخاصة بالمستخدم (donor فقط)
router.get('/my', allowRoles('donor'), donationController.getMyDonations);

// 📌 3. عرض كل التبرعات → فقط لـ admin
router.get('/admin', allowRoles('admin'), donationController.getAllDonations);

module.exports = router;
