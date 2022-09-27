const productController = {
    productDetail: (req, res) => res.render('products/productDetail'),
    productRegister: (req, res) => res.render('products/productRegister'),
    productEdit: (req, res) => res.render('products/productEdit'),
    productRegisterConclude: (req, res) => res.render('products/productRegisterConclude'),
}

module.exports = productController;