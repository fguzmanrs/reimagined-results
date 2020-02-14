var Sequelize = require("sequelize");
var connection = require("../config/connection.js");

var Movie = connection.define("movie", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    // createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    title: { type: Sequelize.STRING, allowNull: false },
    overview: { type: Sequelize.TEXT },
    genre_id: { type: Sequelize.STRING },
    popularity: { type: Sequelize.NUMERIC },
    poster_path: { type: Sequelize.STRING },
    release_date: { type: Sequelize.DATE },
    keyword_id: { type: Sequelize.STRING },
    TMDB_rate: { type: Sequelize.NUMERIC },
    TMDB_id: { type: Sequelize.INTEGER }
}, {
    freezeTableName: true
});

Movie.sync();
module.exports = Movie;