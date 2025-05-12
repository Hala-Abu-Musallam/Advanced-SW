const Payment = require('../models/payment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sequelize = require('../database'); // ✅ هذا هو التعديل المطلوب
// ⚡️ Webhook من Stripe
exports.handleWebhook = (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed.', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // التعامل مع الأحداث
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('✅ Payment succeeded:', paymentIntent.id);
      Payment.update(
        { status: 'completed' },
        { where: { stripe_payment_id: paymentIntent.id } }
      );
      break;

    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object;
      console.log('❌ Payment failed:', failedIntent.id);
      Payment.update(
        { status: 'failed' },
        { where: { stripe_payment_id: failedIntent.id } }
      );
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};


// ✅ إنشاء PaymentIntent فقط (مسار /create-intent)
exports.createPaymentIntent = async (req, res) => {
  const { amount, currency, payment_method } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency || 'usd',
      payment_method: payment_method || 'pm_card_visa',
      confirm: true,
      return_url: `${process.env.FRONTEND_URL}/payment-complete`,
    });

    res.status(200).json({
      success: true,
      paymentIntent
    });
  } catch (error) {
    console.error('Stripe Error (Intent):', error);
    res.status(500).json({
      success: false,
      message: error.raw?.message || 'Failed to create intent',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


// ✅ جلب الدفعات للمستخدم الحالي
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { user_id: req.user.ID } // ✅ عدلناها من id إلى ID
    });

    res.json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payments',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


// ✅ تعديل دفعة
exports.updatePayment = async (req, res) => {
  try {
    const { amount, currency, status } = req.body;
    const payment = await Payment.findByPk(req.params.id);

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    payment.amount = amount || payment.amount;
    payment.currency = currency || payment.currency;
    payment.status = status || payment.status;

    await payment.save();

    res.json({ success: true, message: 'Payment updated successfully', data: payment });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating payment',
      error: error.message
    });
  }
};

// ✅ حذف دفعة
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    await payment.destroy();
    res.json({ success: true, message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting payment',
      error: error.message
    });
  }
};

// 📊 إحصائيات الدفع
exports.getPaymentStats = async (req, res) => {
  try {
    const stats = await Payment.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('ID')), 'total_payments'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'total_amount'],
        [sequelize.literal('COUNT(CASE WHEN status = "completed" THEN 1 END)'), 'completed_payments']
      ],
      where: { user_id: req.user.ID }
    });

    res.json({ success: true, data: stats[0] });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stats',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
