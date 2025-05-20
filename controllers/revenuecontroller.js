const Donation = require('../models/donations');


exports.getTotalRevenue = async (req, res) => {
  try {
    const donations = await Donation.findAll();

    let totalAmount = 0;
    let totalRevenue = 0;

    donations.forEach(donation => {
      totalAmount += donation.amount;
      totalRevenue += donation.platform_fee || 0;
    });

    res.status(200).json({
      success: true,
      message: 'Platform revenue calculated successfully.',
      total_donations_amount: totalAmount.toFixed(2),
      total_platform_revenue: totalRevenue.toFixed(2),
      fee_rate: '2%'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error calculating revenue' });
  }
};

exports.getRevenueBreakdown = async (req, res) => {
  try {
    const donations = await Donation.findAll({
      attributes: ['id', 'amount', 'platform_fee', 'category', 'created_at']
    });

    res.status(200).json({ success: true, data: donations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching breakdown' });
  }
};
