const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
const db = require('../config/connection');

class Favorite extends Model {};

Favorite.init({
    username: {
        type:DataTypes.STRING,
        references: {
            model: 'user',
            key: 'username'
          },
    },
    email: {
        type:DataTypes.STRING,
        references: {
            model: 'user',
            key: 'email'
          },
    }
}, {
    sequelize: db,
    modelName: 'favorite',
    freezeTableName: true,
    // hooks: {
    //     async beforeCreate(user) {
    //         const encrypted_pass = await bcrypt.hash(user.password, 10);
    //         user.password = encrypted_pass;
    //     }
    // }
});


module.exports = Favorite;