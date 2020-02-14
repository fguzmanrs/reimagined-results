var Sequelize = require("sequelize");
var connection = require("../config/connection.js");

var Review = connection.define("review", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    user_id: { type: Sequelize.INTEGER },
    movie_id: { type: Sequelize.INTEGER },
    grade: { type: Sequelize.INTEGER, allowNull: false, validate: { min: 0, max: 2 } }
}, {
    freezeTableName: true
});

Review.sync();
module.exports = Review;