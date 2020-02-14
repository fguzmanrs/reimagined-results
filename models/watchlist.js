var Sequelize = require("sequelize");
var connection = require("../config/connection.js");

var Watchlist = connection.define("watchlist", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    user_id: { type: Sequelize.INTEGER },
    movie_id: { type: Sequelize.INTEGER }
}, {
    freezeTableName: true
});

Watchlist.sync();
module.exports = Watchlist;