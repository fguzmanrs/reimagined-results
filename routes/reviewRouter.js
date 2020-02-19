const express = require("express");
const path = require("path");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

// When user add a movie to watchlist, post user's preference for movies(genre, keywords)
router.post("/userid/:userId/movieid/:movieId/grade/:grade", reviewController.postReview);

module.exports = router;
