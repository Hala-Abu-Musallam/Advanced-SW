const axios = require("axios");
const db = require("../models");
const Trust = db.Trust;
const Review = db.Review;


const verifyNGO = async (req, res) => {
  const { ngoName } = req.query;

  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");

    const matchedNgo = response.data.find(user =>
      user.name.toLowerCase().includes(ngoName.toLowerCase())
    );

    if (matchedNgo) {
      const [trust, created] = await Trust.findOrCreate({
        where: { ngoName },
        defaults: {
          verified: true,
          source: "JSONPlaceholder",
          mission: `Demo mission for ${matchedNgo.name}`,
          url: matchedNgo.website || "https://jsonplaceholder.typicode.com"
        }
      });

      if (!created) {
        trust.verified = true;
        trust.source = "JSONPlaceholder";
        trust.mission = `Demo mission for ${matchedNgo.name}`;
        trust.url = matchedNgo.website || "https://jsonplaceholder.typicode.com";
        await trust.save();
      }

      return res.status(200).json(trust);
    } else {
      return res.status(404).json({ verified: false, message: "NGO not found" });
    }
  } catch (error) {
    console.error("Error fetching external NGO data:", error.message);
    return res.status(500).json({ error: "External API error" });
  }
};


const getAllNGOs = async (req, res) => {
  try {
    const ngos = await Trust.findAll({
      include: [{ model: Review }]
    });
    res.status(200).json(ngos);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve NGOs" });
  }
};

const addReview = async (req, res) => {
  const { trustId, userName, rating, comment } = req.body;

  try {
    const trust = await Trust.findByPk(trustId);
    if (!trust) return res.status(404).json({ error: "NGO not found" });

    const review = await Review.create({
      trustId,
      userName,
      rating,
      comment
    });

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
};

const getReviews = async (req, res) => {
  const { trustId } = req.params;

  try {
    const reviews = await Review.findAll({ where: { trustId } });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch reviews" });
  }
};


const updateReview = async (req, res) => {
  const reviewId = req.params.id;
  const { userName, rating, comment } = req.body;

  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    review.userName = userName || review.userName;
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Failed to update review" });
  }
};

module.exports = {
  verifyNGO,
  getAllNGOs,
  addReview,
  getReviews,
  updateReview
};
