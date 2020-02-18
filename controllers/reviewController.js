const axios = require("axios");
const catchAsync = require("../utill/catchAsync");

exports.postReview = catchAsync(async (req, res, next) => {
  const { genreId, keywordId } = req.params;

  console.log(genreId, keywordId);

  //![Sequelize] Need a data insert to review table(genreId, keywordId)

  res.status(200).json({
    status: "success"
  });
});
