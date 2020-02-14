// Handlers
const axios = require("axios");
const catchAsync = require("../utill/catchAsync");

exports.getRecentMovies = async (req, res) => {
  const tmdbEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

  const movies = await axios({
    method: "get",
    url: tmdbEndpoint
  });

  res.status(200).json({
    status: "sucess",
    length: movies.data.results.length,
    data: movies.data.results
  });
};

exports.getMovieDetail = async (req, res) => {
  const movieId = req.params.movieId;
  const tmdbEndpoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

  const info = await axios({
    method: "get",
    url: tmdbEndpoint
  });

  res.status(200).json({
    status: "sucess",
    length: info.data.results.length,
    data: info.data.results
  });
};

exports.getProviders = async function(req, res) {
  axios({
    method: "GET",
    url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
      "x-rapidapi-key": utellyApiKey
    },
    params: {
      term: "bojack",
      country: "uk"
    }
  })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};
