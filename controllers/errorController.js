const ErrorFactory = require("../utill/errorFactory");

//! Global error handler : Catching all errors
exports.globalErrorHandler = (err, req, res, next) => {
  console.log("🚨 ERROR OCCURED!", err);

  err.statusCode = err.statusCode || 500; // 4** or 500
  err.status = err.status || "error"; // failure or error

  console.log("🍓 process.env.NODE_ENV: ", process.env.NODE_ENV);

  //* CASE 1: when it's in development mode
  // Show all detail of err
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack
    });
  }
  //* CASE 2: when it's in production mode
  else if (process.env.NODE_ENV === "production") {
    //* CASE 2.1: Catch err coming from DB and make it custom err

    //? A. Unique Constraint Err
    // e.g.: duplicated tmdbId when creating a movie, already existing username etc...
    if (err.name === "SequelizeUniqueConstraintError") {
      const errItem = err.errors[0];

      err = new ErrorFactory(
        400,
        `The ${errItem.path}, "${errItem.value}" already exists in our database. Please try again with unique value.`
      );
    }

    //? B. Null Validation Err
    if (err.name === "SequelizeValidationError") {
      const errItem = err.errors[0];

      err = new ErrorFactory(
        400,
        `The ${errItem.path} cannot be empty. Please enter all required info.`
      );
    }

    //? C. Foreign Key Constraint Err
    // e.g.: when creating a discovered with user id, movie id(both foreign keys), there is no such a user or movie in DB matching to the requested info
    if (err.name === "SequelizeForeignKeyConstraintError") {
      err = new ErrorFactory(
        400,
        `The value matching to the requested ${err.fields} doesn't exist in database. Please enter the accurate info.`
      );
    }

    //* CASE 2.2 : Catch err coming from 3rd party APIs(TMDB, Utelly)
    //? A. There is no such a data
    if (err.message === "Request failed with status code 404") {
      console.log("🍇 3rd party APIs cannot find any wanted data");

      err = new ErrorFactory(
        404,
        "The requested data doesn't exist in our external servers. Please try again with the accurate info."
      );
    }

    //* CASE 2.3 : When it's an operational err, show user friendly message
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    //* CASE 2.4 : When it's a programing err, show general err message
    else {
      res.status(500).json({
        status: "error",
        message: "Something went wrong. Please try later."
      });
    }
  }
};
