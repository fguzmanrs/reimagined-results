const express = require("express");
const path = require("path");
const axios = require("axios");
const movieRouter = require("./routes/movieRouter");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend folder location
app.use(express.static(path.join(__dirname, "public")));

// APIs
app.use("/api/movie", movieRouter);
// app.use("/api/user", userRouter);
// app.use("/api/review", reviewRouter);

// Global error handler
// app.use((err, req, res, next) => {});

app.listen(PORT, err => {
  if (err) throw err;
  console.log("Listening...");
});
