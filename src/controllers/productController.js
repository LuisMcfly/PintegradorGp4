const { check, validationResult } = require('express-validator');
const { Product, Category, Manufacturers, Features } = require('../../models/index');

const productShopRender = async (req, res) => {
    const [categories, Manufacturers, features] = await Promise.all([
        Category.findAll(),
        Manufacturers.findAll(),
        Features.findAll()
    ])

    return res.send(Manufacturers)

    res.render('products/productShop', {
        categories, 
        Manufacturers, 
        features,
        errors: [],
        datos: {}
    })
};

const productDetailRender = (req, res) => {
    // let producto = ObjProductos.find(producto => producto.id == req.params.id);
    // res.render('products/productDetail', { producto });
    res.render('products/productDetail');
};

const productRegisterRender = async (req, res) => {
    // Consultar a la base de datos por las categorias
    const [categories, Manufacturers, features] = await Promise.all([
        Category.findAll(),
        Manufacturers.findAll(),
        Features.findAll()
    ])

    res.render('products/productRegister', {
        categories, 
        Manufacturers, 
        features,
        errors: [],
        datos: {}
    })
}

const productCreate = async (req, res) => {

    // Validaciones
    await check('name').notEmpty().withMessage('El nombre del producto no puede estar vacio').run(req)
    await check('manufacturer').notEmpty().withMessage('Debes seleccionar el nombre de un fabricante').run(req)
    await check('model').notEmpty().withMessage('Debes indicar el modelo del producto').run(req)
    await check('variations').notEmpty().withMessage('Debes seleccionar las caracteristicas').run(req)
    await check('category').notEmpty().withMessage('Debes seleccionar la categoria').run(req)
    await check('description').notEmpty().withMessage('La descripcion es necesaria').run(req)
    await check('price').notEmpty().withMessage('Debes indicar el precio del producto').run(req)
    await check('discount').notEmpty().withMessage('Debes indicar el descuento del producto').run(req)
    await check('stock').notEmpty().withMessage('Debes indicar el stock del producto').run(req)

    let resultado = validationResult(req);

    if(!resultado.isEmpty()){

        const [categories, Manufacturers, features] = await Promise.all([
            Category.findAll(),
            Manufacturers.findAll(),
            Features.findAll()
        ])

        return res.render('products/productRegister', {
            categories, 
            Manufacturers, 
            features,
            errors: resultado.array(),
            datos: req.body
        });
    };

    const { name, manufacturer: manofacturer_id, model, variations: features_id, category: category_id, description, price, discount, stock, images} = req.body

    try {
        const productSave = await Product.create({
            name,
            manofacturer_id,
            model,
            features_id, 
            category_id, 
            description, 
            price, 
            discount, 
            stock, 
            images: ""
        })
    } catch (error) {
        console.log(error);
    }

    res.redirect('/');
}

const productEditRender = async (req, res) => {

    let resultado = validationResult(req);

    if(!resultado.isEmpty()){

        const [categories, Manufacturers, features] = await Promise.all([
            Category.findAll(),
            Manufacturers.findAll(),
            Features.findAll()
        ])

        return res.render('products/productEdit', {
            categories, 
            Manufacturers, 
            features,
            errors: resultado.array(),
            datos: req.body
        });
    };

    const { id } = req.params;

    // Validacion de que el producto si existe

    const product = await Product.findByPk(id);
    console.log(product);
    if(!product){
        return res.redirect('products/productShop');
    }

    // Hacer la consulta del producto en la base de datos

    const [categories, Manufacturers, features] = await Promise.all([
        Category.findAll(),
        Manufacturers.findAll(),
        Features.findAll()
    ])

    return res.render('products/productEdit', {
        categories, 
        Manufacturers, 
        features,
        errors: resultado.array(),
        datos: product
    });
};

const productEdit = async (req, res) => {

    let resultado = validationResult(req);

    if(!resultado.isEmpty()){

        const [categories, Manufacturers, features] = await Promise.all([
            Category.findAll(),
            Manufacturers.findAll(),
            Features.findAll()
        ])

        return res.render('products/productEdit', {
            categories, 
            Manufacturers, 
            features,
            errors: resultado.array(),
            datos: req.body
        });
    };

    const { id } = req.params;

    // Validacion de que el producto si existe

    const product = await Product.findByPk(id);

    if(!product){
        return res.redirect('/productShop');
    }

    try {
        const { name, manufacturer: manofacturer_id, model, variations: features_id, category: category_id, description, price, discount, stock, images} = req.body;

        product.set({
            name,
            manofacturer_id,
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

const deleteProduct = async (req, res) => {

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
    productCreate,
    productRegisterRender,
    productEditRender,
    productEdit,
    productDeleteRender,
    deleteProduct
}