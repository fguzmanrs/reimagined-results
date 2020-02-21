require("dotenv").config();

// Handling uncaught exception error
process.on("uncaughtException", err => {
  console.log("UNCAUGHT EXCEPTION! 🚧  Shutting down...");
  console.log(err.name, err.message);

  process.exit(1);
});

const PORT = process.env.PORT || 3000;
const app = require("./app");
const db = require("./models");

let server;

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(function() {
  console.info("Sequelize: sync()");

  server = app.listen(PORT, function(err) {
    if (err) throw err;
    console.info("App listening on PORT " + PORT);
  });
});

// Handling unhandled rejection(Promise errors)
process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION! 🚧  Shutting down...");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
