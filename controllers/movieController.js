const axios = require("axios");
const Sequelize = require("sequelize");
var db = require("../models");
const Op = Sequelize.Op;

const catchAsync = require("../utill/catchAsync");
const ErrorFactory = require("../utill/errorFactory");

//! Get the recent movies(within 1 year)
// required parameter: none
exports.getRecentMovies = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  const lastYear = currentDate.getFullYear() - 1;
  const month = `0${currentDate.getMonth() + 1}`.slice(-2); // 2 digit
  const date = `0${currentDate.getDate()}`.slice(-2); // 2 digit
  const oneYearBefore = `${lastYear}-${month}-${date}`;

  const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${oneYearBefore}`;

  const movies = await axios(tmdbUrl);

  res.status(200).json({
    status: "success",
    length: movies.data.results.length,
    data: movies.data.results
  });
});

//! Get movie info: detail + keyword
// required parameter: TMDB id
exports.getMovieDetail = catchAsync(async (req, res, next) => {
  const tmdbId = req.params.tmdbId;
  const tmdbUrlDetail = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
  const tmdbUrlKeyword = `https://api.themoviedb.org/3/movie/${tmdbId}/keywords?api_key=${process.env.TMDB_API_KEY}`;

  const detail = await axios(tmdbUrlDetail);
  const keyword = await axios(tmdbUrlKeyword);

  detail.data.keywords = keyword.data.keywords;

  res.status(200).json({
    status: "success",
    data: detail.data
  });
});

//! Get on demand service providers for specific movie(Netflix, Amazon prime etc)
// required parameter: movie title
exports.getProviders = catchAsync(async function(req, res, next) {
  const movieToSearch = req.params.tmdbId;

  const result = await axios({
    method: "GET",
    url:
      "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host":
        "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.UTELLY_API_KEY
    },
    params: {
      country: "US",
      source_id: movieToSearch,
      source: "tmdb"
    }
  });

  const providersArr = result.data.collection.locations;
  console.log("🍈 provider results: ", providersArr);

  // Filter the movies having the exact same name with the search term
  // (* Utelly DB provides a partial search so all similar name's movies are searched.)
  // const filteredMovie = movies.data.results.filter(
  //   el => el.name.toLowerCase() === movieToSearch.toLowerCase()
  // );

  // Error handling : If there is no data user are searching, create custom error
  // if (result.data.collection.locations.length === 0) {
  //   return next(
  //     new ErrorFactory(
  //       404,
  //       "There is no such a data you requested. Please provide with the correct info."
  //     )
  //   );
  // }

  res.status(200).json({
    status: "success",
    data: providersArr
  });
});

//! Recommend movies based on a genre id, keyword id
// required parameter: TMDB genre id, keyword id
// Reduced to TMDB genre id (by dropdown menu)
exports.getRecommendation = catchAsync(async (req, res, next) => {
  // const { genreId, keywordId } = req.params;
  // const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_keywords=${keywordId}`;
console.info('movieController.getRecommendation();');
  const { genreId } = req.params;
  const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`;

  const movies = await axios(tmdbUrl);

  res.status(200).json({
    status: "success",
    data: movies.data
  });
});

//! Post a movie to DB
// required info via req.body: title, overview, genreId, popularity, posterPath, releaseDate, keywordId(stringified array), tmdbRate, tmdbId(stringified array)
exports.createMovie = catchAsync(async (req, res, next) => {
  console.log("🍉 req.body: ", req.body);

  const createdMovie = await db.movie.create(req.body);

  res.status(201).json({
    status: "success",
    data: createdMovie
  });
});

// exports.getMovieByKeyword = catchAsync(async (req, res, next) => {
//   const { keywordId } = req.params;
//   db.movie
//     .findAll({
//       where: {
//         keywordId: { [Op.like]: "%" + keywordId + "%" }
//       }
//     })
//     .then(function(result) {
//       if (result.affectedRows == 0) {
//         return res.status(404).end();
//       } else {
//         res.status(200).json(result);
//       }
//     });
// });

// exports.getMovieByGenre = catchAsync(async (req, res, next) => {
//   const { genreId } = req.params;
//   db.movie
//     .findAll({
//       where: {
//         keywordId: { [Op.like]: "%" + keywordId + "%" }
//       }
//     })
//     .then(function(result) {
//       if (result.affectedRows == 0) {
//         return res.status(404).end();
//       } else {
//         res.status(200).json(result);
//       }
//     });
// });

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  //![Sequelize] Need to get user info from user table
  db.watchlist.findOne({ where: { id: id } }).then(function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).json(result);
    }
  });
});
