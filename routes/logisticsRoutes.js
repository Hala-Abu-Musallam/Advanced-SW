const express = require('express');
const router = express.Router();
const logisticsController = require('../controllers/logisticsController');

router.post("/", logisticsController.uploadImage, logisticsController.createLogisticsRequest);
router.get("/", logisticsController.getAllLogistics);
router.put("/:id/location", logisticsController.updateLocation);
router.put("/:id/schedule", logisticsController.updateSchedule);

module.exports = router;