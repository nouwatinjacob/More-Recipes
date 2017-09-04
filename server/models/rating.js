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
  return Rating;
};