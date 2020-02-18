const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const catchAsync = require("../utill/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const { username, password, firstName, lastName } = req.body;
  var userId;

  // Validation
  if (!username || !password) {
    return next(new Error("Please provide email and password."));
  }

  //* Encrypt user's password
  const encryptedPwd = await bcrypt.hash(password, 12);

  //! [Sequelize] Store new user info to DB (username, encryptedPwd)
  db.user.create({
    username: username,
    password: encryptedPwd,
    firstName: firstName,
    lastName: lastName
  }).then(function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).json(result);
      userId = result.userId;
    }
  });

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

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.params;

  const encryptedPwd = await bcrypt.hash(password, 12);
  //![Sequelize] Need to get user info from user table
  db.user.findOne({ where: { username: username, password: encryptedPwd } }).then(function (result) {
    if (result.affectedRows == 0) {
      console.info('user.login: username/password combination not found');
      return res.status(404).end();
    } else {
      res.status(200).json(result);
      console.info('user.login: logged in as ' + result.username);
    }
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  // req.session.destroy((err) => {
  //   if (err)
  //     return console.log(err);
  //   res.redirect('/');
  // });
});
// exports.protect = catchAsync(async (req, res) => {});