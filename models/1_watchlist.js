module.exports = function (sequelize, Sequelize) {
    var Watchlist = sequelize.define("watchlist", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: Sequelize.INTEGER, references: { model: 'User', key: 'id', unique: 'u' } },
        movieId: { type: Sequelize.INTEGER, references: { model: 'Movie', key: 'id', unique: 'u' } }
    },
        { freezeTableName: true },
        { uniqueKeys: { u: { fields: ['userId', 'movieId'] } } });

    console.info("Sequelize: ./models/watchlist.js");
    return Watchlist;
};
