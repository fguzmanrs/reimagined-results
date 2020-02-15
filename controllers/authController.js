const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const catchAsync = require("../utill/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return next(new Error("Please provide email and password."));
  }

  //* Encrypt user's password
  const encryptedPwd = await bcrypt.hash(password, 12);

  //! [Sequelize] Store new user info to DB (username, encryptedPwd)
  //! [Sequelize] get new user's id for token creation: get it from the returned result of adding user info to DB(userId)

  // will continue to work
  const token = jwt.sign(
    {
      username
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JSWT_EXPIRES_IN }
  );

  console.log(token);

  res.status(200).json({
    status: "success",
    message: "New user has been successfully created!",
    token,
    data: {
      username
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {});

exports.logout = catchAsync(async (req, res, next) => {});
// exports.protect = catchAsync(async (req, res) => {});
