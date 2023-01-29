const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Features = db.define('features', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
});

module.exports = Features;