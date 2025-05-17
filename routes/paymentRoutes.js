const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authimddleware');


router.post('/create-intent', paymentController.createPaymentIntent);

router.put('/payments/:id', authmiddleware, paymentController.updatePayment);
router.delete('/:id', authmiddleware, paymentController.deletePayment);

router.get('/payments/stats', authmiddleware, paymentController.getPaymentStats);
router.get('/my-payments',authmiddleware, paymentController.getPayments);

router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  paymentController.handleWebhook
);

module.exports = router;