// ERROR FACTORY : Custom Error Class
module.exports = class ErrorFactory extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "failure" : "error";

    // This is for sending a message differently to the client depending on error types(operational || programming)
    // If it's a programming err in production mode, send only general message hiding the detail of err so that it prevents from leacking the vulnerability of server.
    this.isOperational = true;

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
