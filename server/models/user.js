const bcrypt = require('bcrypt-nodejs');


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
      password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

 },

    {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Recipe, { foreignKey: 'user_id' });
      }
    },
    instanceMethods: {
      generateHash(password) {
        this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
    },
    hooks: {
      beforeCreate: (user) => {
        user.generateHash(user.password);
      },
      beforeUpdate: (user) => {
        if (user.password) {
          user.generateHash(user.password);
        }
      }
   }

  });

   return User;
};