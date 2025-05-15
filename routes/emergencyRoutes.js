const express = require("express");
const router = express.Router();
const emergencyController = require("../controllers/emergencyController");

router.post("/", emergencyController.createCampaign);
router.get("/", emergencyController.getAllCampaigns);
router.get("/:id", emergencyController.getCampaignById);
router.put("/:id", emergencyController.updateCampaign);
router.post("/:id/donate", emergencyController.donateToCampaign);
router.post("/:id/deactivate", emergencyController.deactivateCampaign);

module.exports = router;
