const ErrorFactory = require("../utill/errorFactory");

//! Global error handler : Catching all errors
exports.globalErrorHandler = (err, req, res, next) => {
  console.log("🚨 ERROR OCCURED!", err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.log("🍓 process.env.NODE_ENV: ", process.env.NODE_ENV);

  //* CASE 1. : when it's in development mode
  // Show detail of err
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err
    });
  }
  //* CASE 2. : when it's in production mode
  else if (process.env.NODE_ENV === "production") {
    // When DB throw an error becuase of a duplicated input, catch and convert it to the custom error
    if (err.name === "SequelizeUniqueConstraintError") {
      const errItem = err.errors[0];

      err = new ErrorFactory(
        400,
        `The ${errItem.path}, "${errItem.value}" has been already taken by other.`
      );
    }

    //* CASE 2.a : When it's operational err, show user friendly message
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    //* CASE 2.b : When it's programing err, show general err message
    else {
      res.status(500).json({
        status: "error",
        message: "Something went wrong. Please try later."
      });
    }
  }
};
