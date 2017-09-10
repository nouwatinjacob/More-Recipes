const bcrypt = require('bcrypt-nodejs');


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });


    User.associate = (models) => {
        User.hasMany(models.Recipe, {
            foreignKey: 'user_id'
        });
        User.hasMany(models.Review, {
            foreignKey: 'user_id'
        });
        User.hasMany(models.Favorite, {
            foreignKey: 'user_id'
        });
        User.hasMany(models.Rating, {
            foreignKey: 'user_id'
        })
    };

    User.prototype.comparePassword = function(user, password) {
        return bcrypt.compareSync(password, user.password);
    };
    // Hooks
    User.hook('beforeCreate', (user) => {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
    });

    return User;
};