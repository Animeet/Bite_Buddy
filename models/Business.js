const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
const db = require('../config/connection');

class Business extends Model { };

Business.init({
    type: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING,
        references: {
            model: 'user',
            key: 'username'
        },
    },
    email: {
        type: DataTypes.STRING,
        references: {
            model: 'user',
            key: 'email'
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        },
    },
    business_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    business_address: {
        type: DataTypes.STRING,
        isValid: true,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    food: {
        type: DataTypes.STRING,
        allowNull: false
    },
    delivery: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    dining_deal: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'business',
    freezeTableName: true,
    // hooks: {
    //     async beforeCreate(user) {
    //         const encrypted_pass = await bcrypt.hash(user.password, 10);
    //         user.password = encrypted_pass;
    //     }
    // }
});


module.exports = Business;