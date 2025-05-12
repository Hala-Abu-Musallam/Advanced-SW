// controllers/adminController.js
const db = require('../database');

exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(200).json(results);
    });
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(200).json({ message: 'User deleted successfully' });
    });
};

// ممكن تضيف أكثر حسب المطلوب مثل: تعديل دور المستخدم، مراجعة التبرعات، إلخ
