module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      name: {
      type: DataTypes.STRING,
      allowNull: false,
      },
      email: {
      type:DataTypes.STRING,
      allowNull: false,
      },
      telephone: {
      type:DataTypes.STRING,
      allowNull: false,
      },
      username: {
      type:DataTypes.STRING,
      allowNull: false,
      },
      user_image: {
      type:DataTypes.STRING,
      allowNull: false,
      }, 
  });

   return User;
};