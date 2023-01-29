const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Invoice = db.define('invoices', {
    invoiceNumber: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Invoice;   