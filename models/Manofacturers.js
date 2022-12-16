const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Manofacturers = db.define('manofacturers', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
);

module.exports = Manofacturers;