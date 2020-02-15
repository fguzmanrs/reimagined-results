const express = require("express");
const path = require("path");
const movieRouter = require("./routes/movieRouter");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");

const app = express();

// Frontend folder location
app.use(express.static(path.join(__dirname, "public")));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

// Global Error Handler: work on later
app.use("/", (err, req, res, next) => {});

module.exports = app;
