// var Sequelize = require("sequelize");
// var connection = require("../config/connection.js");

// var User = connection.define("user", {
//     id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
//     firstName: { type: Sequelize.STRING, allowNull: false },
//     lastName: { type: Sequelize.STRING, allowNull: false },
//     username: { type: Sequelize.STRING, allowNull: false },
//     password: { type: Sequelize.STRING, allowNull: false }
// }, {
//     freezeTableName: true
// });

// User.sync();
// module.exports = User;

module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define("user", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        firstName: { type: Sequelize.STRING, allowNull: false },
        lastName: { type: Sequelize.STRING, allowNull: false },
        username: { type: Sequelize.STRING, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false }
    }, {
        freezeTableName: true
    });
    console.info("Sequelize: ./models/user.js");
    return User;
};