const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const movieRouter = require("./routes/movieRouter");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");
const { globalErrorHandler } = require("./controllers/errorController");

const app = express();

// Frontend folder location
app.use(express.static(path.join(__dirname, "public")));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Router
app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

// Error handling for invalid path access
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Cannot find ${req.originalUrl} on the server. Please check the path.`
  });
});

// Global error handling middeware
app.use(globalErrorHandler);

module.exports = app;
