const express = require('express');
const router = express.Router();
const orphanController = require('../controllers/orphanController');

router.post('/orphans', orphanController.createOrphan);
router.get('/orphans', orphanController.getAllOrphans);
router.get('/orphans/:id', orphanController.getOrphanById);
router.put('/orphans/:id', orphanController.updateOrphan);
router.delete('/orphans/:id', orphanController.deleteOrphan);

router.post('/sponsorships', orphanController.createSponsorshipRequest);
router.get('/sponsorships', orphanController.getSponsorshipRequests);
router.put('/sponsorships/:id/status', orphanController.updateRequestStatus);

module.exports = router;