let fs = require('fs')
const { uuid } = require('uuidv4')

const productos = JSON.parse(fs.readFileSync('DB/products.json', {encoding: 'utf-8'}));//trae lo que hay en en archivo, se parsea para poder usarlo en js
const fabricantes = JSON.parse(fs.readFileSync('DB/fabricantes.json', {encoding: 'utf-8'}));
const categorias = JSON.parse(fs.readFileSync('DB/categorias.json', {encoding: 'utf-8'}));

const productController = {
    productShop: (req, res) => res.render('products/productShop', {categorias, productos}),
    productDetail: (req, res) => res.render('products/productDetail'),
    productRegister: (req, res) => res.render('products/productRegister', {fabricantes}),
    create: (req, res) => {
        let image 
        if (req.files[0]!=undefined){
            image=req.files[0].filename;
        } else {
            image = 'none.png';
        }
        
        productos.push({id: uuid(),...req.body, image}); // pushea al objeto literal
        let productsJSON = JSON.stringify(productos, null); // convierte a objeto JSON
        fs.writeFileSync('DB/products.json', productsJSON); // Escribe el archivo

        res.redirect('productRegisterConclude');
    },
    productEdit: (req, res) => res.render('products/productEdit'),
    productRegisterConclude: (req, res) => res.render('products/productRegisterConclude'),
}

module.exports = productController;