const express = require("express");
const path = require("path");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

// Authentification Routers
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Protect below routers : only login user can access below routers
// router.use(authController.protect);

//! APIs
// Get user info
router.get("/:userId", userController.getUserInfo);

// When user add a movie to watchlist, post user's preference for movies(genre, keywords)
router.post("/preference/:genreId/:keywordId", userController.postUserPreference);

module.exports = router;
