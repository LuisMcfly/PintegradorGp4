const Product = require('./Product.js');
const Category = require('./Category.js');
const User = require('./User.js');
const Features = require('./Features.js');
const Manufacturers = require('./Manufacturers.js');

Product.belongsTo(Category, {foreignKey: 'category_id'});
Product.belongsTo(Features, {foreignKey: 'features_id'});
Product.belongsTo(Manufacturers, {foreignKey: 'manofacturer_id'});

module.exports = {
    Product,
    Category,
    User,
    Features,
    Manufacturers
  };
