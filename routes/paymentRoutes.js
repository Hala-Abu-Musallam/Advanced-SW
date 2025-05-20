const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const paymentController = require('../controllers/paymentController'); // ✅ تأكد من الاسم
const authMiddleware = require('../middleware/authmiddleware'); // ✅

router.post('/create-intent', authMiddleware.authenticateToken, paymentController.createPaymentAndSave);

router.put('/payments/:id', authMiddleware.authenticateToken, paymentController.updatePayment);
router.delete('/:id', authMiddleware.authenticateToken, paymentController.deletePayment);

router.get('/payments/stats', authMiddleware.authenticateToken, paymentController.getPaymentStats);
router.get('/my-payments', authMiddleware.authenticateToken, paymentController.getPayments);

router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  paymentController.handleWebhook
);

module.exports = router;
