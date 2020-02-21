const catchAsync = require("../utill/catchAsync");
var db = require("../models");

// const Op = Sequelize.Op;

// Create a discovered : This is for tracking which user clicks which movie. This data will be used for movie recommendation.
// Movie recommendation : a user's discovered movies + watchlist movies => get the most counted genre and keyword then recommend movies searched by that genre, keyword
// required info via req.body: userId, movieId(TMDB id)
exports.createDiscover = catchAsync(async (req, res, next) => {
  console.log("🍉 req.body: ", req.body);

  const createdDiscovered = await db.discovered.create(req.body);

  res.status(201).json({
    status: "success",
    data: createdDiscovered
  });
});
