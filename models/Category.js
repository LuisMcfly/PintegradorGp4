const db = require('../config/db.js');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Category = db.define(alias, cols, config);

    Category.associate = function (models) {
        Category.hasMany(models.Product, { // models.Movies -> Movie es el valor de alias en movie.js
            as: "products", // El nombre del modelo pero en plural
            foreignKey: "category_id"
        })
    }

    return Category
};