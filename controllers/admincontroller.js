const sequelize = require('../database');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await sequelize.query(`
      SELECT 
        u.ID, 
        u.username, 
        u.email, 
        ur.role_name AS role, 
        ur.description, 
        u.created_at
      FROM 
        users u
      LEFT JOIN 
        userroles ur ON u.username = ur.username
    `, {
      type: sequelize.QueryTypes.SELECT
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await sequelize.query('DELETE FROM users WHERE ID = ?', {
      replacements: [id],
      type: sequelize.QueryTypes.DELETE
    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

exports.getTransparencyReport = async (req, res) => {
  try {
    const results = await sequelize.query(`
      SELECT 
        d.id AS donation_id,
        u.username AS donor,
        u.email,
        d.type,
        d.amount,
        d.platform_fee,
        d.category,
        d.status,
        DATE(d.created_at) AS date
      FROM donations d
      JOIN users u ON d.user_id = u.ID
      ORDER BY d.created_at DESC
    `, {
      type: sequelize.QueryTypes.SELECT
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Transparency fetch error:', error.message);
    res.status(500).json({ message: 'Failed to fetch transparency report' });
  }
};
