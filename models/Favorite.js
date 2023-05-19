const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Favorite extends Model { };

Favorite.init({
    name: {
        type: DataTypes.STRING,
        references: {
            model: 'user',
            key: 'username'
        },
    }
}, {
    sequelize: db,
    modelName: 'favorite',
    freezeTableName: true,
});


module.exports = Favorite;