const express = require("express");
const path = require("path");

require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(function() {
  console.info("Sequelize: sync()");
  app.listen(PORT, function(err) {
    if (err) throw err;
    console.info("App listening on PORT " + PORT);
  });
});
