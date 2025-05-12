const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

// 📌 إنشاء PaymentIntent (تجهيزي فقط)

router.post('/create-intent', paymentController.createPaymentIntent);

// ✅ المسارات اللي تحتاج توثيق JWT
router.put('/payments/:id', authMiddleware, paymentController.updatePayment);
router.delete('/:id', authMiddleware, paymentController.deletePayment);

router.get('/payments/stats', authMiddleware, paymentController.getPaymentStats);
router.get('/my-payments',authMiddleware, paymentController.getPayments);

// ⚡️ Stripe Webhook
router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  paymentController.handleWebhook
);

module.exports = router;
