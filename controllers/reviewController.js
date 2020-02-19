const axios = require("axios");
const catchAsync = require("../utill/catchAsync");

exports.postReview = catchAsync(async (req, res, next) => {
  const { userId, movieId } = req.params;

  console.log(userId, movieId);

  //![Sequelize] Need a data insert to review table(userId, movieId)

  res.status(200).json({
    status: "success",
    message: "The review is successfully posted!"
  });
});
