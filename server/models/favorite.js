module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('Favorite', {
        recipe_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    Favorite.associate = (models) => {
        Favorite.belongsTo(models.Recipe, {
            foreignKey: 'recipe_id'
        });
        Favorite.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
    };

    return Favorite;
};