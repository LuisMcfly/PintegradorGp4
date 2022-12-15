const db = require('../config/db.js');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        manufacturer: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        model: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        variations: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT(500),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(50,1),
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL(3,1),
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        colors: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL(3,1),
            allowNull: false
        },
        images: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        category_id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
        },
    }
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Product = db.define(alias, cols, config); 

    Product.associate = function (models) {
        Product.belongsTo(models.Category, { // models.Movie -> Movies es el valor de alias en movie.js
            as: "categories",
            foreignKey: 'category_id',
        })
    }

    return Product
};

