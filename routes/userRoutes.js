const express = require('express');
const router = express.Router();

// مثال لمسار سليم
router.get('/', (req, res) => {
  res.json({ message: 'Users route is working ✅' });
});

module.exports = router;
