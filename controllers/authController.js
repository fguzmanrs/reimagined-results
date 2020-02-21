const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const db = require("../models");
const catchAsync = require("../utill/catchAsync");
const ErrorFactory = require("../utill/errorFactory");

//! JWT CREATOR : Create JSON Web Token with a user id for authentication with stateless server
const createToken = userId => {
  const token = jwt.sign(
    {
      userId
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return token;
};

//! SIGN UP
exports.signup = catchAsync(async (req, res, next) => {
  // 1. Get user's input
  const { firstName, lastName, username, password } = req.body;

  // 2. Validate for no input
  if (!username || !password || !firstName || !lastName) {
    return next(new ErrorFactory(400, "Please provide all required info."));
  }

  // 3. Encrypt the password
  const encryptedPwd = await bcrypt.hash(password, 12);

  // 4. Store a new user into DB
  const result = await db.user.create({
    username,
    password: encryptedPwd,
    firstName,
    lastName
  });

  // 5. Create a JWT token
  const token = createToken(result.dataValues.id);

  // 6. Send a respond with cookie: Prevents from accessing/modifying the cookie from anywhere except http browser. Expires after 1 hour.
  res
    .cookie("jwt", token, {
      maxAge: 3600000,
      httpOnly: true
    })
    .status(200)
    .json({
      status: "success",
      message: "New user has been successfully created!",
      token,
      data: {
        username
      }
    });
});

//! LOGIN
exports.login = catchAsync(async (req, res, next) => {
  // 1. Get login info from request
  const { username, password } = req.body;

  // 2. Validation(a): Check if username and password exist
  if (!username || !password) {
    return next(new ErrorFactory(400, "Please provide email and password."));
  }

  // 3. Bring user data matching to the username from DB
  const result = await db.user.findOne({ where: { username } });

  // 4. Validation(b): Check if there is a matching user and user's input password is same as that of DB(return Boolean)
  if (
    !result ||
    !(await bcrypt.compare(password, result.dataValues.password))
  ) {
    return next(
      new ErrorFactory(
        401,
        "There is no such a user or you typed the password wrong!"
      )
    );
  }

  // 5. Create JWT token with user's id
  const token = createToken(result.dataValues.id);

  // 6. Send a response
  res
    .cookie("jwt", token, {
      maxAge: 3600000,
      httpOnly: true
    })
    .status(200)
    .json({
      status: "success",
      message: "You are logged in successfully!",
      token
    });
});

//! LOGOUT : Clear cookie having a JWT token
exports.logout = catchAsync(async (req, res, next) => {
  // Check if a user is logged out
  if (!req.cookies.jwt) {
    return next(new ErrorFactory(400, "You are already logged out!"));
  }

  // Clear cookie and token so the user can logout
  res
    .clearCookie("jwt")
    .status(200)
    .json({
      status: "success",
      message: "You are successfully loged out!"
    });
});

//! PROTECT Middleware
//Protects other middlewares coming after this middleware(Not allow to access to next middlewares if a request fails to be verified here for its authentication)
exports.protect = catchAsync(async (req, res, next) => {
  // 1. Check if a user is logged in(via JWT)
  const token = req.cookies.jwt;

  if (!token) {
    return next(
      new ErrorFactory(401, "You are not logged in! Please log in first.")
    );
  }

  // 2. Verify the token and get user's id from it
  const decodedJwt = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log("✨ decoded JWT: ", decodedJwt); // format: { userId: 123, iat: 1582066423, exp: 1582070023 }

  // 3. Check if there is a user matching to that id from DB
  const result = await db.user.findByPk(decodedJwt.userId);

  if (!result) {
    return next(
      new ErrorFactory(
        401,
        "The user belonging to this token doesn't exist any longer."
      )
    );
  }

  // 4. Save user info to request in order to use it in next controllers.
  req.user = result.dataValues;
  console.log("🤡 user: ", req.user);

  next();
});
