const catchAsync = require("../utill/catchAsync");

exports.getUserInfo = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  //![Sequelize] Need to get user info from user table

  res.status(200).json({
    status: "success"
  });
});

exports.postUserPreference = catchAsync(async (req, res, next) => {
  const { genreId, keywordId } = req.params;

  console.log(genreId, keywordId);

  //![Sequelize] Need a data insert to review table(genreId, keywordId)

  res.status(200).json({
    status: "success"
  });
});
