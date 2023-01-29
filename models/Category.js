const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Category = db.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
});

module.exports = Category;


