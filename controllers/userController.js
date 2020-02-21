const catchAsync = require("../utill/catchAsync");
var db = require("../models");

exports.getUserInfo = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  db.user.findOne({ where: { id: userId } }).then(function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).json(result);
    }
  });
});

exports.getMyWatchList = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  db.watchlist.findAll({ where: { userId: userId } }).then(function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).json(result);
    }
  });
});

exports.postToMyWatchlist = catchAsync(async (req, res, next) => {
  console.info("userController.postToMyWatchList...");
  const { userId, movieId } = req.params;

  db.watchlist
    .create({
      userId: userId,
      movieId: movieId
    })
    .then(function(result) {
      res.status(200).json(result);
      return catchAsync(req, res, next);
    });
});

exports.removeFromMyWatchlist = catchAsync(async (req, res, next) => {
  const { userId, movieId } = req.params;

  db.watchlist
    .destroy({
      where: {
        userId: userId,
        movieId: movieId
      }
    })
    .then(function(result) {
      // We have access to the new todo as an argument inside of the callback function
      res.status(200).json(result);
    });
});

exports.clearMyWatchlist = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  db.watchlist
    .destroy({
      where: {
        userId: userId
      }
    })
    .then(function(result) {
      // We have access to the new todo as an argument inside of the callback function
      res.status(200).json(result);
    });
});
