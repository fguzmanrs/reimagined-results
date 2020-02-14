const express = require("express");
const path = require("path");
const axios = require("axios");
const movieRouter = require("./routes/movieRouter");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

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

// app.listen(PORT, err => {
//   if (err) throw err;
//   console.log("Listening...");
// });

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  console.info("Sequelize: sync()");
  app.listen(PORT, function() {
    console.info("App listening on PORT " + PORT);
  });
});