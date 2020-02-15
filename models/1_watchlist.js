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
