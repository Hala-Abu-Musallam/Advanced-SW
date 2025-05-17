const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationcontroller');


const { authenticateToken } = require('../middleware/authmiddleware');
const { allowRoles } = require('../middleware/rolemiddleware');


router.use(authenticateToken);


router.post('/', allowRoles('donor'), donationController.createDonation);


router.get('/my', allowRoles('donor'), donationController.getMyDonations);


router.get('/admin', allowRoles('admin'), donationController.getAllDonations);

module.exports = router;
