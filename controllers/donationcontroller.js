const sequelize = require('../database');


exports.createDonation = async (req, res) => {
    const { type, amount, category } = req.body;
    const userId = req.user?.ID;
  
    console.log('📥 Incoming donation:', { userId, type, amount, category });
  
    try {
      const [result] = await sequelize.query(
        'INSERT INTO donations (user_id, type, amount, category) VALUES (?, ?, ?, ?)',
        {
          replacements: [userId, type, amount, category],
          type: sequelize.QueryTypes.INSERT
        }
      );
  
      console.log('✅ Donation insert result:', result);
  
      res.status(201).json({ message: 'Donation created successfully' });
    } catch (error) {
      console.error('❌ Donation insert error:', error.message);
      res.status(500).json({ message: 'Failed to create donation' });
    }
  };
  

exports.getMyDonations = async (req, res) => {
  const userId = req.user.ID;

  try {
    const donations = await sequelize.query(
      'SELECT * FROM donations WHERE user_id = ?',
      {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT
      }
    );

    res.status(200).json(donations);
  } catch (error) {
    console.error('❌ Error fetching user donations:', error);
    res.status(500).json({ message: 'Failed to fetch your donations' });
  }
};

exports.getAllDonations = async (req, res) => {
  try {
    const donations = await sequelize.query(`
      SELECT 
        d.id, d.type, d.amount, d.category, d.status, d.created_at,
        u.username, u.email
      FROM donations d
      JOIN users u ON d.user_id = u.ID
    `, {
      type: sequelize.QueryTypes.SELECT
    });

    res.status(200).json(donations);
  } catch (error) {
    console.error('❌ Error fetching all donations:', error);
    res.status(500).json({ message: 'Failed to fetch all donations' });
  }
};
