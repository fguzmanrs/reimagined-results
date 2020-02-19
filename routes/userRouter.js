const express = require("express");
const path = require("path");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

// Authentification Routers
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

//! APIs
// Get user info
router.get("/:userId", userController.getUserInfo);

module.exports = router;
