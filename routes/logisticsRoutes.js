const express = require('express');
const router = express.Router();
const logisticsController = require('../controllers/logisticsController');

router.post("/", logisticsController.uploadImage, logisticsController.createLogisticsRequest);
router.get("/", logisticsController.getAllLogistics);

module.exports = router;