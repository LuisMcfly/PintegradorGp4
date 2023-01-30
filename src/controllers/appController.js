const { Product, Category, Manufacturer, Features  } = require('../../models/index');
const { Sequelize } = require('sequelize')

const search = async (req, res) => {
    const { searchProduct } = req.body

    // Validar que termino no este vacio
    console.log(searchProduct)
    if(!searchProduct.trim()){
        return res.redirect('/')
    }

    const productSearch = await Product.findAll({
        where: {
            name: {
                [Sequelize.Op.like] : '%' + searchProduct + '%'
            }
        },
        include: [
            { model: Manufacturer, as: 'manufacturer'},
            { model: Category, as: 'category'},
            { model: Features, as: 'feature'}
        ]
    })

    res.render('products/searchProducts', {productSearch})
}

module.exports = {
    search
}