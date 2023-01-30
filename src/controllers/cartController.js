const { check, validationResult } = require('express-validator');
const fs = require('fs')
const Jwt = require('jsonwebtoken');

const { Op } = require("sequelize");
const { User, Product } = require('../../models/index');

let invoiceObj = JSON.parse(fs.readFileSync('DB/invoice.json', { encoding: 'utf-8' }));
const { uploadsPath } = require('../../helpers/filePaths')

const cartRender = async (req, res) => {
    // ordenar el objeto invoice por Id de producto
    invoiceObj.sort((a, b) => a.productId - b.productId)

    // Guardar todos los id de los productos en un solo array
    let invoiceProducts = [];
    let invoiceQuantity = [];
    let invoicePrices = [];
    let totalPrice = 0;
    invoiceObj.forEach(element => {
        invoiceProducts.push(element.productId);
        invoiceQuantity.push(element.quantity);
        invoicePrices.push(Math.round(element.netPrice * element.quantity));
        totalPrice += Math.round(element.netPrice * element.quantity);
    });

    if (invoiceProducts.length > 0) {
        try {
            const [products] = await Promise.all([
                Product.findAll({
                            where: {
                                id: {
                                    [Op.or]: invoiceProducts
                                }
                            }
                        })
            ]);
            
            return res.render('cart/cart', { products, invoicePrices, invoiceQuantity, totalPrice });
        } catch {
            return res.send("error");
        }
    }
    return res.render('cart/cart', { products: null})
}

const addToCart = async (req, res) => {
    let userId

    // busca si hay un usuario logeado
    if(req.cookies._token) {
        const decodedToken = Jwt.verify(req.cookies._token, process.env.JWT_SECRET)
        const user = await User.scope('eliminarPassword').findByPk(decodedToken.id)
        userId = user.id
    } else {
        userId = null;
    }
    
    // let productId = parseInt(req.params.id, 10);
    let productId = parseInt(req.params.id, 10);
    let quantity = 1;
    let netPrice = Math.round(req.body.price * (1 - req.body.discount/100)); // precio neto, calculando el descuento
    let productToCart

    // pregunta si existe
    productToCart = invoiceObj.find(element => element.productId == productId)

    if(productToCart) {
        // por ser un objeto que se escribe en memoria como referencia, se actualiza al cambiar la propiedad desde la variable
        productToCart.quantity += quantity
        productToCart.netPrice = netPrice
    } else {
        // si no existe en el JSON, lo pushea
        productToCart = {userId, productId, quantity, netPrice}
        invoiceObj.push(productToCart)
    }
    
    fs.writeFileSync('DB/invoice.json', JSON.stringify(invoiceObj, null, "    "));
    return res.redirect('/cart/')
}

const add1ToCart = (req, res) => {
    let productId = parseInt(req.params.id, 10);
    let productToCart = invoiceObj.find(element => element.productId == productId)

    productToCart.quantity += 1;
    // return res.send(invoiceObj)
    fs.writeFileSync('DB/invoice.json', JSON.stringify(invoiceObj, null, "    "));
    return res.redirect('/cart/')
}

const subtract1FromCart = (req, res) => {
    let productId = parseInt(req.params.id, 10);
    // let productId = req.params.id;
    let productToCart = invoiceObj.find(element => element.productId == productId)

    if(productToCart.quantity == 1) {
        invoiceObj = invoiceObj.filter(element => element.productId != productId)
    } else {
        productToCart.quantity -= 1;
    }
    
    fs.writeFileSync('DB/invoice.json', JSON.stringify(invoiceObj, null, "    "));
    return res.redirect('/cart/')
}

const removeFromCart = (req, res) => {
    let productId = parseInt(req.params.id, 10);
    invoiceObj = invoiceObj.filter(element => element.productId != productId)

    fs.writeFileSync('DB/invoice.json', JSON.stringify(invoiceObj, null, "    "));
    return res.redirect('/cart/')
}


module.exports = {
    cartRender,
    addToCart,
    add1ToCart,
    subtract1FromCart,
    removeFromCart
};