const mysql = require("mysql");
const { promisify } = require("util");

let pool;

if (process.env.NODE_ENV === "development") {
  pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    acquireTimeout: 10000
  });
} else {
  pool = mysql.createPool(process.env.DB.REMOTE);
}

pool.getConnection((err, connection) => {
  if (err) {
    console.log(`🚨 Cannot connect to DB! : ${err}`);
    connection.destroy();
    process.exit(1);
  }
  console.log("👋 Connected to DB...");
});

pool.asyncQuery = promisify(pool.query).bind(pool);

module.exports = pool;
