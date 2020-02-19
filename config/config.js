module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: "reimagined_db",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};
