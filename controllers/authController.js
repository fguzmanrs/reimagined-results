const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const catchAsync = require("../utill/catchAsync");

//! Create JSON Web Token with userId: should change username to user_id later.
const createToken = userId => {
  const token = jwt.sign(
    {
      userId
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JSWT_EXPIRES_IN }
  );
  return token;
};

exports.signup = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return next(new Error("Please provide email and password."));
  }

  //* Encrypt user's password
  const encryptedPwd = await bcrypt.hash(password, 12);

  //! [Sequelize] Store new user info to DB (username, encryptedPwd)
  //! [Sequelize] get new user's id to create a token: get it from the returned result of adding user info to DB(userId)
  const token = createToken(username);

  console.log("Token: ", token);

  res.status(200).json({
    status: "success",
    message: "New user has been successfully created!",
    token,
    data: {
      username
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // Validation 1.Check username and password exists
  if (!username || !password) {
    return next(new Error("Please provide email and password."));
  }

  // Validation 2. Check there is a user matching to input username
  //! [Sequelize] bring a user matching the username(user)
  const user = {};

  // Validation 3. Check if user's input password is same as the password from DB(return Boolean)
  const isCorrectedPwd = await bcrypt.compare(password, user.password);

  // If there is NO user found in DB or the password is wrong
  if (!user || !isCorrectedPwd) {
    next(new Error("There is no such a user or you typed the password wrong!"));
  }

  // Create a token
  const token = createToken(user.id);

  res.status(200).json({
    status: "success",
    message: "You are logged in successfully!",
    token
  });
});

exports.logout = catchAsync(async (req, res, next) => {});
exports.protect = catchAsync(async (req, res, next) => {
  // check if there is a token and get it

  if (!req.header.authorization || !req.header.authorization.startsWith("Bearer")) {
    res.status(401).json({});
  }
  // varificate the token

  // check if there is a user

  // check if the user changed the password after the tocken was issued
  console.log("This is protect middleware");
  next();
});
