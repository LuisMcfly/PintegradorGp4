const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Manufacturer = db.define('manufacturers', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: false
});

module.exports = Manufacturer;