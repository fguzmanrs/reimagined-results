// var Sequelize = require("sequelize");
// var connection = require("../config/connection.js");

// var Review = connection.define("review", {
//     id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
//     user_id: { type: Sequelize.INTEGER, references: { model: User, key: 'id' } },
//     movie_id: { type: Sequelize.INTEGER, references: { model: Movie, key: 'id' } },
//     grade: { type: Sequelize.INTEGER, allowNull: false, validate: { min: 0, max: 2 } }
// }, {
//     freezeTableName: true
// });

// Review.sync();
// module.exports = Review;

module.exports = function (sequelize, Sequelize) {
    var Review = sequelize.define("review", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: Sequelize.INTEGER, references: { model: 'User', key: 'id' } },
        movieId: { type: Sequelize.INTEGER, references: { model: 'Movie', key: 'id' } },
        grade: { type: Sequelize.INTEGER, allowNull: false, validate: { min: 0, max: 2 } }
    }, {
        freezeTableName: true
    });
    console.info("Sequelize: ./models/review.js");
    return Review;
};