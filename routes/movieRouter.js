const express = require("express");
const path = require("path");
const axios = require("axios");
const catchAsync = require("../utill/catchAsync");
const movieController = require("../controllers/movieController");

const router = express.Router();

const utellyApiKey = process.env.utellyApiKey;

// APIs
// 	1. to get the latest popular movies(1 year) for landing page moviesTMDB: discover  > movie discover
router.get("/recent", movieController.getRecentMovies);

// 	2. to get movie details(info & genre, keywords)TMDB: search > search movies |  movies > get details, get keywords
router.get("/:id", movieController.getMovieDetail);

module.exports = router;
// API

// [methods]

// 	3. to get available providers and link to provider's movie pageUtelly : serch by title and return available providers & url
// 	4. to recommend moviesTMDB: discover > movie discover with user's the most hitted genre, keyword
