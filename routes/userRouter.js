const express = require("express");
const path = require("path");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

// Authentification Routers
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

//! APIs
// Get user info
router.get("/:userId", userController.getUserInfo);

router.post("/review/:userId/:movieId/:grade", reviewController.postReview);

// When user add a movie to watchlist, post user's preference for movies(genre, keywords)
router.get("/watchlist/:userId", userController.getMyWatchList);
router.post("/watchlist/:userId/:movieId", userController.postToMyWatchlist);
router.put("/watchlist/:userId/:movieId", userController.removeFromMyWatchlist);
router.delete("/watchlist/:userId/", userController.clearMyWatchlist);

module.exports = router;
