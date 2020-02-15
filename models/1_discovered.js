// var Sequelize = require("sequelize");

// var Discovered = Sequelize.define("discovered", {
//     id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
//     user_id: { type: Sequelize.INTEGER, references: { model: 'User', key: 'id' } },
//     movie_id: { type: Sequelize.INTEGER, references: { model: 'Movie', key: 'id' } }
// }, {
//     freezeTableName: true
// });

// Discovered.sync();
// module.exports = Discovered;

// module.exports = function (sequelize, Sequelize) {
//     var Discovered = sequelize.define("discovered", {
//         id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//         userId: { type: Sequelize.INTEGER, references: { model: 'User', key: 'id' } },
//         movieId: { type: Sequelize.INTEGER, references: { model: 'Movie', key: 'id' } }
//     }, {
//         freezeTableName: true
//     });
//     console.info("Sequelize: ./models/discovered.js");
//     return Discovered;
// };
