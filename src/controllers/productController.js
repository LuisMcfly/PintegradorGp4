const { check, validationResult } = require('express-validator');

const { Op } = require("sequelize");
const { Product, Category, Manufacturer, Features } = require('../../models/index');
const { uploadsPath } = require('../../helpers/filePaths')
//'products/productShop'
const productShopRender = async (req, res) => {
    const [products] = await Promise.all([Product.findAll({
        where: {
            stock: { [Op.gt]: 0 } // Si no hay stock, no lo muestra en la tienda
        }
    })]);
    // res.send(products)

    res.render('products/productShop', {products})
}

const productDetailRender = async (req, res) => {    
    const { id } = req.params;

    // Validacion de que el producto si existe
    const productInfo = await Product.findByPk(id, {
        include: [
            { model: Manufacturer, as: 'manufacturer'},
            { model: Category, as: 'category'},
            { model: Features, as: 'feature'}
        ]
    }).catch(()=>{
        return res.redirect('/');
    });
    
    // return res.send(productInfo)
    return res.render('products/productDetail', {productInfo, uploadsPath})
}


const productRegisterRender = async (req, res) => {

    // Consultar a la base de datos por las categorias
    const [categories, manufacturers, features] = await Promise.all([
        Category.findAll(),
        Manufacturer.findAll(),
        Features.findAll()
    ])

    res.render('products/productRegister', {
        categories, 
        manufacturers, 
        features,
        errors: [],
        datos: {}
    })
}

const productCreate = async (req, res) => {

    let image = []

    if (req.files[0] != undefined) {
        for (let i = 0; i < req.files.length; i++) {
            image.push(req.files[i].filename)
        }
    } else {
        image = ['noImage.png'];
    }
    let images = image.toString();



    // Validaciones
    await check('productName').notEmpty().withMessage('El nombre del producto no puede estar vacio').run(req)
    await check('manufacturer').notEmpty().withMessage('Debes seleccionar el nombre de un fabricante').run(req)
    await check('features').notEmpty().withMessage('Debes seleccionar las caracteristicas').run(req)
    await check('category').notEmpty().withMessage('Debes seleccionar la categoria').run(req)
    await check('description').notEmpty().withMessage('La descripcion es necesaria').run(req)
    await check('price').notEmpty().withMessage('Debes indicar el precio del producto').run(req)
    await check('discount').notEmpty().withMessage('Debes indicar el descuento del producto').run(req)
    await check('stock').notEmpty().withMessage('Debes indicar el stock del producto').run(req)

    let resultado = validationResult(req);

    if(!resultado.isEmpty()){

        const [categories, manufacturers, features] = await Promise.all([
            Category.findAll(),
            Manufacturer.findAll(),
            Features.findAll()
        ])

        return res.render('products/productRegister', {
            categories, 
            manufacturers, 
            features,
            errors: resultado.mapped(),
            product: req.body
        });
    };


    const { productName, 
        manufacturer: manufacturer_id, 
        model, 
        variations: features_id, 
        category: category_id, 
        description, 
        price, 
        discount, 
        stock 
    } = req.body


    try {
        const productSave = await Product.create({
            name: productName,
            manufacturer_id,
            model: "hola",
            features_id, 
            category_id, 
            description, 
            price, 
            discount, 
            stock, 
            images
        })
    } catch (error) {
        console.log(error);
    }

    res.redirect('/products/');
}

const productEditRender = async (req, res) => {

    let resultado = validationResult(req);

    if(!resultado.isEmpty()) {

        const [categorys, manufacturers, features] = await Promise.all([
            Category.findAll(),
            Manufacturer.findAll(),
            Features.findAll()
        ]);

        return res.render('products/productEdit', {
            categorys, 
            manufacturers, 
            features,
            errors: resultado.array(),
            datos: req.body
        });
    };

    const productId = req.params.id;
    const product = await Product.findByPk(productId, {
        include: [
        { model: Manufacturer, as: 'manufacturer'},
        { model: Category, as: 'category'},
        { model: Features, as: 'feature'}
    ]});
    
    if(!product){
        return res.redirect('products/productShop');
    }

    // Hacer la consulta del producto en la base de datos
    const [categories, manufacturers, features] = await Promise.all([
        Category.findAll(),
        Manufacturer.findAll(),
        Features.findAll()
    ])

    return res.render('products/productEdit', {
        product,
        categories, 
        manufacturers, 
        features,
        errors: resultado.array(),
    });
};

const productEdit = async (req, res) => {

    let resultado = validationResult(req);

    if(!resultado.isEmpty()){

        const [categorys, manufacturers, features] = await Promise.all([
            Category.findAll(),
            Manufacturer.findAll(),
            Features.findAll()
        ])

        return res.render('products/productEdit', {
            categorys, 
            manufacturers, 
            features,
            errors: resultado.array(),
            datos: req.body
        });
    };

    const { productId } = req.params;

    // Validacion de que el producto si existe
    const product = await Product.findByPk(productId);

    if(!product){
        return res.redirect('/productShop');
    }

    try {
        const { 
            name, 
            manufacturer: manufacturer_id, 
            model, variations: features_id, 
            category: category_id, 
            description, 
            price, 
            discount, 
            stock, 
            images} = req.body;

        product.set({
            name,
            manufacturer_id,
            model,
            features_id, 
            category_id, 
            description, 
            price, 
            discount, 
            stock, 
            images: ""
        })

        await product.save();
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }

};

const productDeleteRender = async (req, res) => {

    const { id } = req.params;

    // Validacion de que el producto si existe

    const product = await Product.findByPk(id);
    if(!product){
        return res.redirect('products/productShop');
    }

    // Hacer la consulta del producto en la base de datos

    return res.render('products/productDelete', {
        datos: product
    });
};

const productDelete = async (req, res) => {

    const { id } = req.params;

    // Validacion de que el producto si existe

    const product = await Product.findByPk(id);

    if(!product){
        return res.redirect('/productShop');
    }

    // Eliminar el producto
    await product.destroy();
    res.redirect('/productShop');
};

module.exports = {
    productShopRender,
    productDetailRender,
    productRegisterRender,
    productEditRender,
    productDeleteRender,
    productCreate,
    productEdit,
    productDelete,
}