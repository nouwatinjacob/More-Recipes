module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    vote: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  Rating.associate = (models) => {
    Rating.belongsTo(models.Recipe, {
      foreignKey: 'recipe_id'
    });
    Rating.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return Rating;
};
