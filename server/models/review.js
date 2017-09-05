module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review_body: {
      type: DataTypes.TEXT,
      allowNull: false
  }, 
  user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
},

  {
    classMethods: {
      associate: (models) => {
        Review.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
        Review.belongsTo(models.Recipe, {
            foreignKey: 'recipe_id'
        });
      }
    }
  });
  return Review;
};