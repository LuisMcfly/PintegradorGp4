const { Product, Category, Manofacturers, Features } = require('../../models/index');

const categoryRender = async (req, res) => {
    const [categories] = await Promise.all([Category.findAll()])
    
    return await res.status(200).json({
        total: categories.length,
        data: categories,
        status: 200
    })
}

module.exports = {
    categoryRender
}