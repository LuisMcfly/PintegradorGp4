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
        type: DataTypes.STRING,
        allowNull: false
    },
    discount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'defaultProductImage.png'
    }   
});

module.exports = Product;