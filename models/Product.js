const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Product = db.define('products', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    variations: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    discount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    colors: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    images: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'category',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
}, 

);

module.exports = Product;