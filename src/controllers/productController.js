const productController = {
    productDetail: (req, res) => res.render('products/productDetail'),
    productRegister: (req, res) => res.render('products/productRegister'),
    productEdit: (req, res) => res.render('products/productEdit'),
    productRegisterConcluid: (req, res) => res.render('products/productRegisterConcluid'),
}

module.exports = productController;