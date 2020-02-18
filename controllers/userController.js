const catchAsync = require("../utill/catchAsync");
var db = require("../models");

exports.getUserInfo = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  //![Sequelize] Need to get user info from user table
  db.user.findOne({ where: { id: userId } }).then(function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).json(result);
    }
  });
});

exports.getMyWatchList = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  //![Sequelize] Need to get user info from user table
  db.watchlist.findAll({ where: { userId: userId } }).then(function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).json(result);
    }
  });
});

exports.postToMyWatchList = catchAsync(async (req, res, next) => {
  const { userId, movieId } = req.params;
  //![Sequelize] Need a data insert to review table(genreId, keywordId)
  db.watchlist.create({
    userId: usedId,
    movieId: movieId
  }).then(function (result) {
    // We have access to the new todo as an argument inside of the callback function
    res.status(200).json(result);
  });
});

exports.removeFromMyWatchList = catchAsync(async (req, res, next) => {
  const { userId, movieId } = req.params;
  //![Sequelize] Need a data insert to review table(genreId, keywordId)
  db.watchlist.destroy(
    {
      where: {
        userId: usedId,
        movieId: movieId
      }
    }).then(function (result) {
      // We have access to the new todo as an argument inside of the callback function
      res.status(200).json(result);
    });
});

exports.clearMyWatchList = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  //![Sequelize] Need a data insert to review table(genreId, keywordId)
  db.watchlist.destroy({
    where: {
      userId: usedId
    }
  }).then(function (result) {
    // We have access to the new todo as an argument inside of the callback function
    res.status(200).json(result);
  });
});

// Moved to reviewControllers
// exports.postReview = catchAsync(async (req, res, next) => {
//   const { userId, movieId, grade } = req.params;
//   //![Sequelize] Need a data insert to review table(genreId, keywordId)
//   db.review.create({
//     userId: usedId,
//     movieId: movieId,
//     grade: grade
//   }).then(function(result) {
//     // We have access to the new todo as an argument inside of the callback function
//     res.status(200).json(result);
//   });
// });
