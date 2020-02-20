exports.globalErrorHandler = (err, req, res, next) => {
  //   console.log(err, "this is global err");
  console.log("err.message", err.statusCode);
  res.status(403).json({
    status: "fail",
    message: "catched err from global err handler"
  });
};

exports.errorFactory = class extends Error {
  constructor(statusCode, message) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;

    // This is for sending a message differently to the client depends on error types(operational || programming)
    // If it's a programming err, send only general message hiding the detail of err in production mode.
    this.isOperational = true;

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
