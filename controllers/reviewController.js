// const axios = require("axios");
const catchAsync = require("../utill/catchAsync");
var db = require("../models");

exports.postReview = catchAsync(async (req, res, next) => {
    const { userId, movieId, grade } = req.params;
    //![Sequelize] Need a data insert to review table(genreId, keywordId)
    db.review.create({
      userId: userId,
      movieId: movieId,
      grade: grade
    }).then(function(result) {
      res.status(200).json(result);
    });
  });
  