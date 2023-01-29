const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Product = db.define('products', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    images: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'defaultProductImage.png'
    }   
});

module.exports = Product;