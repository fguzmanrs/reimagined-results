const express = require("express");
const path = require("path");
const axios = require("axios");
const catchAsync = require("../utill/catchAsync");
const movieController = require("../controllers/movieController");

const router = express.Router();

const utellyApiKey = process.env.utellyApiKey;

//! APIs
// 1. to get the latest popular movies(1 year) for landing page movies
// used api: TMDB - discover > movie discover
router.get("/recent", movieController.getRecentMovies);

// 2. to get movie details(general info, genre, keywords)
// used api: TMDB - search > search movies by title | movies > get details and keywords by TMDB id
router.get("/:id", movieController.getMovieDetail);

// 3. to get available providers and link to provider's movie page
// used api: Utelly > search by title and return available providers & url
router.get("/providers/:movieTitle", movieController.getProviders);

// 4. to recommend movies
// used api: TMDB - discover > movie discover with user's the most hitted genre, keyword
router.get(
  "/recommend/:genreIds/:keywordIds",
  movieController.getRecommendation
);

module.exports = router;
