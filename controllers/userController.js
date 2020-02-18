const catchAsync = require("../utill/catchAsync");
var db = require("../models");

exports.getUserInfo = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  //![Sequelize] Need to get user info from user table

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

  //![Sequelize] Need to get user info from user table

  db.watchlist.findAll({ where: { userId: userId } }).then(function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).json(result);
    }
  });
});
