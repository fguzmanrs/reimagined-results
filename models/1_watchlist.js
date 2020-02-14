// var Sequelize = require("sequelize");
// var connection = require("../config/connection.js");

// var Watchlist = connection.define("watchlist", {
//     id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
//     user_id: { type: Sequelize.INTEGER, references: { model: User, key: 'id' } },
//     movie_id: { type: Sequelize.INTEGER, references: { model: Movie, key: 'id' } }
// }, {
//     freezeTableName: true
// });

// Watchlist.sync();
// module.exports = Watchlist;

module.exports = function (sequelize, Sequelize) {
    var Watchlist = sequelize.define("watchlist", {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            userId: { type: Sequelize.INTEGER, references: { model: 'User', key: 'id' } },
            movieId: { type: Sequelize.INTEGER, references: { model: 'Movie', key: 'id' } }
        }, {
            freezeTableName: true
        });
        console.info("Sequelize: ./models/watchlist.js");
    return Watchlist;
};