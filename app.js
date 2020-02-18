const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const movieRouter = require("./routes/movieRouter");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");

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

// Global error handler
app.use((err, req, res, next) => {
  console.log(err, "this is global err");
  res.status(403).json({
    status: "fail",
    message: "catched err from global err handler"
  });
});

module.exports = app;
