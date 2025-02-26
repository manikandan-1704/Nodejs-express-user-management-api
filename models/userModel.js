const { DataTypes } = require('sequelize');
const connectDb = require('../config/dbConnection');

const User = connectDb.define("User",{
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: true,
    tableName: "users"
});

module.exports = User;