const Payment = require('../models/payment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sequelize = require('../database');

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
    console.error(' Webhook signature verification failed.', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      Payment.update(
        { status: 'completed' },
        { where: { stripe_payment_id: paymentIntent.id } }
      );
      break;
    }

    case 'payment_intent.payment_failed': {
      const failedIntent = event.data.object;
      console.log('Payment failed:', failedIntent.id);
      Payment.update(
        { status: 'failed' },
        { where: { stripe_payment_id: failedIntent.id } }
      );
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

exports.createPaymentAndSave = async (req, res) => {
  try {
    const { amount, currency, payment_method } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      payment_method,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      }
    });

    const saved = await Payment.create({
      user_id: req.user.ID,
      amount,
      currency,
      stripe_payment_id: paymentIntent.id,
      status: paymentIntent.status
    });

    res.status(200).json({
      success: true,
      message: 'Payment created and saved successfully',
      paymentIntent
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { user_id: req.user.ID }
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

exports.updatePayment = async (req, res) => {
  try {
    const { amount, currency, status } = req.body;
    const payment = await Payment.findByPk(req.params.id);

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    payment.amount = amount ?? payment.amount;
    payment.currency = currency ?? payment.currency;
    payment.status = status ?? payment.status;

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

exports.getPaymentStats = async (req, res) => {
  try {
    const stats = await Payment.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_payments'],
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
