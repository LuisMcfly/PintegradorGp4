let fs = require('fs')
const { uuid } = require('uuidv4') // libreria para ids
const {validationResult} = require('express-validator')//validaciones del form
const ObjProductos = JSON.parse(fs.readFileSync('DB/products.json', {encoding: 'utf-8'}));//trae lo que hay en en archivo, se parsea para poder usarlo en js
const fabricantes = JSON.parse(fs.readFileSync('DB/fabricantes.json', {encoding: 'utf-8'}));
const categorias = JSON.parse(fs.readFileSync('DB/categorias.json', {encoding: 'utf-8'}));

const productController = {
    productShop: (req, res) => res.render('products/productShop', {categorias, ObjProductos}),//lista todos los Productos
    
    productDetail: (req, res) => {
        let producto = ObjProductos.find(producto => producto.id==req.params.id)
        
        res.render('products/productDetail.ejs', {producto})
    },

    productRegister: (req, res) => res.render('products/productRegister', {fabricantes}),

    create: (req, res) => {
        let images = []
        if (req.files[0]!=undefined){
            for (let i = 0; i < req.files.length; i++) {
                images.push(req.files[i].filename)
            }
        } else {
            images = ['noImage.png'];
        }
        /*validaciones del form */
        let errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render('products/productRegister', {fabricantes,
                                                           errors: errors.mapped(),
                                                           old: req.body,
                                                           oldFile: req.file})
        }else{ 
            let rating = 0;
            ObjProductos.push({id: uuid(),...req.body, rating, images}); // pushea al objeto literal

            let productsJSON = JSON.stringify(ObjProductos, null); // convierte a objeto JSON
            fs.writeFileSync('DB/products.json', productsJSON); // Escribe el archivo

            res.redirect('productRegisterConclude'); 
        }
    },
    productEdit: (req, res) =>{ 
        let producto = ObjProductos.find(producto => producto.id==req.params.id)
        res.render('products/productEdit', {producto})
    },
    productUpdate: (req, res) => {
        let producto = ObjProductos.find(producto => producto.id==req.params.id)
        let image = producto.images;
        
         if (req.files[0]!=undefined){
            image = []
            for (let i = 0; i < req.files.length; i++) {
                image.push(req.files[i].filename)
            }
        } else {
            image = image;
        }

        let newProductToUpdate = {
            id: producto.id,
            ...req.body,
            /* name: req.body.name,
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            variations: [],
            category: "",
            description: req.body.description,
            price: req.body.price,
            discount: 0,
            stock: req.body.stock,
            colors: [], */
            rating: 5,
            images: image
        };

        let updatedProductsObj = ObjProductos.map(product => {
            if (product.id == newProductToUpdate.id){
                return product = {...newProductToUpdate};
            }
            return product = product;
        })
        
        //products = newProduct
        fs.writeFileSync('DB/products.json',JSON.stringify(updatedProductsObj, null));
        // res.redirect('/product/editSuccesful');
        
        res.send('Edicion exitosa');
    },
    productDelete: (req, res) => { //puede ir un middelware de confirmacion para eliminar
        let nuevosProductos = ObjProductos.filter(producto => producto.id != req.params.id)
        let productosJSON = JSON.stringify(nuevosProductos, null)
        fs.writeFileSync('DB/products.json', productosJSON)
        res.send('product destroyed')
        //definir si se muestra confirmacion del prodcuto eliminado y como
    },
    productRegisterConclude: (req, res) => res.render('products/productRegisterConclude'),
}

function imgValidate (imgs) {
    if(imgs != undefined){
        return imgs[0].filename;
    }else{
        return productToUpdate.image;
    }
}

module.exports = productController