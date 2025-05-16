const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/:volunteerId', notificationController.getNotifications);
router.put('/:id/read', notificationController.markAsRead);

module.exports = router;
