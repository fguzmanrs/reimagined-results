const express = require("express");
const discoveredController = require("../controllers/discoveredController");
const authController = require("../controllers/authController");

const router = express.Router();

//! APIs
// Create a movie(When user clicks one specific movie, add a movie to 'discovered' table)
router.post("/", authController.protect, discoveredController.createDiscover);

module.exports = router;
