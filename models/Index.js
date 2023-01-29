const Product = require('./Product.js');
const Category = require('./Category.js');
const User = require('./User.js');
const Features = require('./Features.js');
const Manufacturer = require('./Manufacturer.js');

Product.belongsTo(Category, {foreignKey: 'category_id'});
Product.belongsTo(Features, {foreignKey: 'features_id'});
Product.belongsTo(Manufacturer, {foreignKey: 'manufacturer_id'});

module.exports = {
    Product,
    Category,
    User,
    Features,
    Manufacturer
};
