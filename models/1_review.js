module.exports = function (sequelize, Sequelize) {
    var Review = sequelize.define("review", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: Sequelize.INTEGER, references: { model: 'User', key: 'id', unique: 'u' } },
        movieId: { type: Sequelize.INTEGER, references: { model: 'Movie', key: 'id', unique: 'u' } },
        grade: { type: Sequelize.INTEGER, allowNull: false, validate: { min: 0, max: 2 } }
    },
        { freezeTableName: true },
        { uniqueKeys: { u: { fields: ['userId', 'movieId'] } } });
        
    console.info("Sequelize: ./models/review.js");
    return Review;
};
