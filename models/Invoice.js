const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Invoice = db.define('invoices', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
});

module.exports = Invoice;   