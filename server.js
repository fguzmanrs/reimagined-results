const express = require("express");
const path = require("path");
const axios = require("axios");

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

app.get("/");

//Utelly api_key=7d301e256d9f70e2193e6d1089e4d61d

// axios({
//   method: "GET",
//   url:
//     "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup",
//   headers: {
//     "content-type": "application/octet-stream",
//     "x-rapidapi-host":
//       "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
//     "x-rapidapi-key": "67819abeecmsh692ea2f37f1d046p135d57jsndc363598fa20"
//   },
//   params: {
//     term: "okja"
//   }
// })
//   .then(response => {
//     console.log(response);
//   })
//   .catch(error => {
//     console.log(error);
//   });

// app.get("/", (req, res) => {
//   res.send("hello");
// });

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