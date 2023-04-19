const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('./config/connection');


class User extends Model {
    async validatePassword(provided_password) {
        const isValid = await bcrypt.compare(provided_password, this.password);
        return isValid;
    };
};


User.init({
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            max: 50,
            isEmail: true
        },
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            max: 30,
            min: 6,
            msg: "Your password must be a minimum of 6 characters in length",
        },
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'user',
    hooks: {
        async beforeCreate(user) {
            const encrypted_pass = await bcrypt.hash(user.password, 10);
            user.password = encrypted_pass;
        }
    }
});



class Business extends Model {
    async validatePassword(provided_password) {
        const isValid = await bcrypt.compare(provided_password, this.password);
        return isValid;
    };
};


Business.init({
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            max: 50,
            isEmail: true
        },
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            max: 30,
            min: 6,
            msg: "Your password must be a minimum of 6 characters in length",
        },
        allowNull: false
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
    food_package: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'business',
    hooks: {
        async beforeCreate(user) {
            const encrypted_pass = await bcrypt.hash(user.password, 10);
            user.password = encrypted_pass;
        }
    }
});



module.exports = {
    User,
    Business
};
