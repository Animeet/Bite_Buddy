const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
const db = require('../config/connection');


class Subscribe extends Model {}


Subscribe.init({
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            max: 100,
            isEmail: true
        },
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING,
        validate: {
            max: 100,
            min: 3,
        },
        allowNull: false
    },
}, {
    sequelize: db,
    modelName: 'subscribe',
    freezeTableName: true,
    // hooks: {
    //     async beforeCreate(user) {
    //         const encrypted_pass = await bcrypt.hash(user.password, 10);
    //         user.password = encrypted_pass;
    //     }
    // }
});



module.exports = Subscribe;