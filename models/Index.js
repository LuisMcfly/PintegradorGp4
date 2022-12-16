'use strict';

const Product = require('../../models/Product.js');
const Category = require('../../models/Category.js');
const User = require('../../models/User.js');

Category.associate = function (models) {
    Category.hasMany(models.Product, { // models.Movies -> Movie es el valor de alias en movie.js
        as: "products", // El nombre del modelo pero en plural
        foreignKey: "category_id"
    })
}

Product.associate = function (models) {
    Product.belongsTo(models.Category, { // models.Movie -> Movies es el valor de alias en movie.js
        as: "categories",
        foreignKey: 'category_id',
    })
}

module.exports = {
    Product,
    Category,
    User,
  };
