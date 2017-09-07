module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
});
    Recipe.associate = (models) => {
        Recipe.hasMany(models.Review, {
          foreignKey: 'recipe_id'
        });
        Recipe.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
        Recipe.hasMany(models.Favorite, {
            foreignKey: 'recipe_id'
        });
        Recipe.hasMany(models.Rating, {
            foreignKey: 'recipe_id'
        })
  };

  return Recipe;
};