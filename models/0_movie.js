module.exports = function (sequelize, Sequelize) {
    var Movie = sequelize.define("movie", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: Sequelize.STRING, allowNull: false },
        overview: { type: Sequelize.TEXT },
        genreId: { type: Sequelize.STRING },
        popularity: { type: Sequelize.NUMERIC(6,3) },
        posterPath: { type: Sequelize.STRING },
        releaseDate: { type: Sequelize.DATE },
        keywordId: { type: Sequelize.STRING },
        tmdbRate: { type: Sequelize.NUMERIC },
        tmdbId: {type: Sequelize.INTEGER, unique: true}
    }, {
        freezeTableName: true
    });
    console.info("Sequelize: ./models/movie.js");
    return Movie;
};