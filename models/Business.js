const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
const db = require('./config/connection');

class Business extends Model {};

Business.init({
    username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            max: 30
        },
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            max: 100,
            isEmail: true
        },
        allowNull: false
    },
    user_id: {
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
    // hooks: {
    //     async beforeCreate(user) {
    //         const encrypted_pass = await bcrypt.hash(user.password, 10);
    //         user.password = encrypted_pass;
    //     }
    // }
});


module.exports = Business;