const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const db = require("../models");
const catchAsync = require("../utill/catchAsync");

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

  // 2. Validate for no input( username || pwd )
  if (!username || !password) {
    return next(new Error("Please provide email and password.", 400));
  }

  // 3. Encrypt the password
  const encryptedPwd = await bcrypt.hash(password, 12);
  console.log("encryptedPwd", encryptedPwd);

  // 4. Store a new user into DB
  let user;

  db.user
    .create({
      username,
      password: encryptedPwd,
      firstName,
      lastName
    })
    .then(function(result) {
      if (result.affectedRows == 0) {
        return res.status(404).end();
      } else {
        user = result.dataValues.id;
        console.log(user);
        // res.status(200).json(result);
        // userId = result.userId;
      }
    });

  // 5. Create a JWT token
  const token = createToken(user);
  console.log("Token: ", token);

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

// *LOG IN
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // Validation 1.Check if username and password exist
  if (!username || !password) {
    return next(new Error("Please provide email and password.", 400));
  }

  // Validation 2. Check if there is a user matching to the input username
  //! [Sequelize] bring a user matching the username(user)
  // const encryptedPwd = await bcrypt.hash(password, 12);
  //![Sequelize] Need to get user info from user table
  // console.log("db.User: ", db);

  let user;

  db.user.findOne({ where: { username } }).then(async function(result) {
    // console.log("result: ", result);
    if (result === null) {
      console.info("user.login: username/password combination not found");
      return res.status(404).end();
    } else {
      user = result.dataValues;

      console.log("encrypted pwd: ", user.password, "input pwd: ", password);

      // Validation 3. Check if user's input password is same as the password from DB(return Boolean)
      const isCorrectedPwd = await bcrypt.compare(password, user.password);
      console.log("isCorrectedPwd: ", isCorrectedPwd);
      // If there is NO user found in DB or the password is wrong, generate error.
      if (!user || !isCorrectedPwd) {
        return next(
          new Error(
            "There is no such a user or you typed the password wrong!",
            401
          )
        );
      }

      // Create a token
      const token = createToken(user.id);

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
    }
  });
});

//* LOG OUT : Clear cookie having a token
exports.logout = catchAsync(async (req, res, next) => {
  res
    .clearCookie("jwt")
    .status(200)
    .json({
      status: "success",
      message: "You are successfully loged out!"
    });
});

//* PROTECT : Protects other middlewares coming after this middleware( Not allow to access to next middlewares if a request fails to be verified here for its authentication )
exports.protect = catchAsync(async (req, res, next) => {
  console.log("This is protect middleware");

  // Check if the request has a token and save it in variable.
  console.log("authorization", req.cookies.jwt);
  const token = req.cookies.jwt;

  if (!token) {
    return next(new Error("You are not logged in! Please log in first.", 401));
  }

  // Verify the token and get the request's userId
  const decodedJwt = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decodedJwt); // format: { userId: 123, iat: 1582066423, exp: 1582070023 }

  // Check if there is a user matching to that userId from DB
  //! [Sequelize] Find the user matching to decodedJwt's userId
  // below user is for test(password: encrypted pwd of "test1234")
  const user = {
    id: 123,
    firstName: "Emily",
    lastName: "Yu",
    username: "bluerain",
    password: "$2a$12$cojKnsNr/Woe9k0V5IEvPuDPkvNPiUavZVT4fUKUSRjIgwr999igS"
  };

  if (!user) {
    return next(
      new Error(
        "The user belonging to this token doesn't exist any longer.",
        401
      )
    );
  }

  // Save user info to request in order to use it in next controllers.
  req.user = user;
  next();
});
