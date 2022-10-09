let fs = require('fs')
const { uuid } = require('uuidv4')

const productos = JSON.parse(fs.readFileSync('DB/products.json', {encoding: 'utf-8'}));//trae lo que hay en en archivo, se parsea para poder usarlo en js
const fabricantes = JSON.parse(fs.readFileSync('DB/fabricantes.json', {encoding: 'utf-8'}));
const categorias = JSON.parse(fs.readFileSync('DB/categorias.json', {encoding: 'utf-8'}));

const productController = {
    productShop: (req, res) => res.render('products/productShop', {categorias, productos}),//lista todos los productos
    
    productDetail: (req, res) => {
        let producto = productos.find(producto => producto.id==req.params.id)
        console.log('x', producto)
        res.render('products/productDetail', {producto})
    },

    productRegister: (req, res) => res.render('products/productRegister', {fabricantes}),
    create: (req, res) => {
        let image = []
        if (req.files[0]!=undefined){
            for (let i = 0; i < req.files.length; i++) {
                image.push(req.files[i].filename)
            }
        } else {
            image = 'none.png';
        }
        productos.push({id: uuid(),...req.body, image}); // pushea al objeto literal
        let productsJSON = JSON.stringify(productos, null); // convierte a objeto JSON
        fs.writeFileSync('DB/products.json', productsJSON); // Escribe el archivo

        res.redirect('productRegisterConclude');
    },
    productEdit: (req, res) =>{ 
        res.render('products/productEdit')
    },
    productDelete: (req, res) => {//puede ir un middelware de confirmacion para eliminar
        let nuevosProductos = productos.filter(producto => producto.id != req.params.id)
        let productosJSON = JSON.stringify(nuevosProductos, null)
        fs.writeFileSync('DB/products.json', productosJSON)
        res.send('product destroyed')
        //definir si se muetra confirmacion del prodcuto eliminado y como
    },
    productRegisterConclude: (req, res) => res.render('products/productRegisterConclude'),
}

module.exports = productController;