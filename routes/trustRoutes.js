const express = require("express");
const router = express.Router();
const controller = require("../controllers/trustController");


router.get("/verify-ngo", controller.verifyNGO);

router.get("/all-ngos", controller.getAllNGOs);

router.post("/review", controller.addReview);

router.get("/reviews/:trustId", controller.getReviews);


router.put("/review/:id", controller.updateReview);

module.exports = router;
