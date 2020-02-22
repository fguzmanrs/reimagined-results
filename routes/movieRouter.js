const express = require("express");
const movieController = require("../controllers/movieController");
const authController = require("../controllers/authController");

const router = express.Router();

//! Protect below routers : only login user can access below routers
router.use(authController.protect);

//! APIs
// 1. Get the latest popular movies(1 year) for landing page movies
// used api: TMDB - discover > movie discover
router.get("/recent", movieController.getRecentMovies);

// 2. Get movie details(general info, genre, keywords)
// used api: TMDB - search > search movies by title | movies > get details and keywords by TMDB id
router.get("/:tmdbId", movieController.getMovieDetail);

// 3. Get available providers and link to provider's movie page(NetFlix, Amazon Prime...etc)
// used api: Utelly > search by title and return available providers & url
router.get("/providers/:tmdbId", movieController.getProviders);

// 4. Recommend movies
// used api: TMDB - discover > movie discover with user's the most hitted genre, keyword
// router.get("/recommend/:genreId/:keywordId", movieController.getRecommendation);
router.get("/recommend/:genreId", movieController.getRecommendation);

// 5. Create a movie(When user clicks one specific movie, add a movie to 'movie' table)
router.post("/", movieController.createMovie);

module.exports = router;
