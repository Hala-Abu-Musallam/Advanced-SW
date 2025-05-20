const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
router.post('/', volunteerController.registerVolunteer);
router.get('/', volunteerController.getAllVolunteers);

module.exports = router;