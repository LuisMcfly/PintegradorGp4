let fs = require('fs')
const { uuid } = require('uuidv4') // libreria para ids
const { validationResult } = require('express-validator')//validaciones del form
const ObjProductos = JSON.parse(fs.readFileSync('DB/products.json', { encoding: 'utf-8' }));//trae lo que hay en en archivo, se parsea para poder usarlo en js
const fabricantes = JSON.parse(fs.readFileSync('DB/manufacturers.json', { encoding: 'utf-8' }));
const categorias = JSON.parse(fs.readFileSync('DB/categories.json', { encoding: 'utf-8' }));
const { Sequelize } = require('sequelize');
const Products = require('../../models/Product.js');
const Categories = require('../../models/Category.js');
// const model = require('../../models/Index.js')

const productShopRender = (req, res) => res.render('products/productShop', { categorias, ObjProductos });
const productDetailRender = (req, res) => {
    let producto = ObjProductos.find(producto => producto.id == req.params.id);
    res.render('products/productDetail', { producto });
};
const productRegisterRender = (req, res) => res.render('products/productRegister', { fabricantes });
const productEditRender = (req, res) => {
    let producto = ObjProductos.find(producto => producto.id == req.params.id)
    res.render('products/productEdit', { producto })
};

const productCreate = (req, res) => {
    let image = []
    let colors = req.body.colors.toString()
    let rating = 0;
    if (req.files[0] != undefined) {
        for (let i = 0; i < req.files.length; i++) {
            image.push(req.files[i].filename)
        }
    } else {
        image = ['noImage.png'];
    }
    let images = image.toString();

    Products.create({ ...req.body, colors, rating, images })
        .then(() => res.render('products/productRegisterConclude'))


}

const productUpdate = (req, res) => {
    let producto = ObjProductos.find(producto => producto.id == req.params.id)
    let image = producto.images;

    if (req.files[0] != undefined) {
        image = [];
        for (let i = 0; i < req.files.length; i++) {
            image.push(req.files[i].filename);
        }
    } else {
        image = image;
    }
    console.log(image)

    let newProductToUpdate = {
        id: producto.id,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        variations: [],
        category: "",
        description: req.body.description,
        price: req.body.price,
        discount: 0,
        stock: req.body.stock,
        colors: [],
        rating: 5,
        images: image
    };

    let updatedProductsObj = ObjProductos.map(product => {
        if (product.id == newProductToUpdate.id) {
            return product = { ...newProductToUpdate };
        }
        return product = product;
    })
    fs.writeFileSync('DB/products.json', JSON.stringify(updatedProductsObj, null));

    res.send('Edicion exitosa');
};
const productDelete = (req, res) => { //puede ir un middelware de confirmacion para eliminar
    let nuevosProductos = ObjProductos.filter(producto => producto.id != req.params.id)
    let productosJSON = JSON.stringify(nuevosProductos, null)
    fs.writeFileSync('DB/products.json', productosJSON)
    res.send('product destroyed')
    //definir si se muetra confirmacion del prodcuto eliminado y como
};


function imgValidate(imgs) {
    if (imgs != undefined) {
        return imgs[0].filename;
    } else {
        return productToUpdate.image;
    }
}

// module.exports = productController;
module.exports = {
    productShopRender,
    productDetailRender,
    productRegisterRender,
    productEditRender,
    productCreate,
    productUpdate,
    productDelete
}
