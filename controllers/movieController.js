const axios = require("axios");
const catchAsync = require("../utill/catchAsync");
var db = require("../models");
const Op = Sequelize.Op;

exports.getRecentMovies = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  const lastYear = currentDate.getFullYear() - 1;
  const month = `0${currentDate.getMonth() + 1}`.slice(-2);
  const date = `0${currentDate.getDate()}`.slice(-2);
  const oneYearBefore = `${lastYear}-${month}-${date}`;

  const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${oneYearBefore}`;

  const movies = await axios(tmdbUrl);

  res.status(200).json({
    status: "success",
    length: movies.data.results.length,
    data: movies.data.results
  });
});

exports.getMovieDetail = catchAsync(async (req, res, next) => {
  const tbmdId = req.params.tbmdId;
  const tmdbUrlDetail = `https://api.themoviedb.org/3/movie/${tbmdId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
  const tmdbUrlKeyword = `https://api.themoviedb.org/3/movie/${tbmdId}/keywords?api_key=${process.env.TMDB_API_KEY}`;

  const detail = await axios(tmdbUrlDetail);
  const keyword = await axios(tmdbUrlKeyword);

  detail.data.keywords = keyword.data.keywords;

  res.status(200).json({
    status: "success",
    data: detail.data
  });
});

exports.getProviders = catchAsync(async function (req, res, next) {
  const movieToSearch = req.params.movieTitle;

  const movies = await axios({
    method: "GET",
    url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.UTELLY_API_KEY
    },
    params: {
      term: movieToSearch,
      country: "us"
    }
  });

  // Filter the movies having the exact same name with the search term
  const filteredMovie = movies.data.results.filter(
    el => el.name.toLowerCase() === movieToSearch.toLowerCase()
  );

  res.status(200).json({
    status: "success",
    data: filteredMovie
  });
});

exports.getRecommendation = catchAsync(async (req, res, next) => {
  const { genreIds, keywordIds } = req.params;

  const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreIds}&with_keywords=${keywordIds}`;

  const movies = await axios(tmdbUrl);

  res.status(200).json({
    status: "success",
    data: movies.data
  });
});

exports.postToMovieDatabase = catchAsync(async (req, res, next) => {
  const { title, overview, genreId, popularity, posterPath, releaseDate, keywordId, tmdbRate, tmdbId } = req.params;
  //![Sequelize] Need a data insert to review table(genreId, keywordId)
  db.movie.create({
    title: title,
    overview: overview,
    genreId: genreId,
    popularity: popularity,
    posterPath: posterPath,
    releaseDate: releaseDate,
    keywordId: keywordId,
    tmdbRate: tmdbRate,
    tmdbId: tmdbId
  }).then(function (result) {
    res.status(200).json(result);
  });
});

exports.getMovieByKeyword = catchAsync(async (req, res, next) => {
  const { keywordId } = req.params;
  db.movie.findAll({
    where: {
      keywordId: { [Op.like]: '%' + keywordId + '%' }
    }
  }).then(function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).json(result);
    }
  });
});

exports.getMovieByGenre = catchAsync(async (req, res, next) => {
  const { genreId } = req.params;
  db.movie.findAll({
    where: {
      keywordId: { [Op.like]: '%' + keywordId + '%' }
    }
  }).then(function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).json(result);
    }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  //![Sequelize] Need to get user info from user table
  db.watchlist.findOne({ where: { id: id } }).then(function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).json(result);
    }
  });
});