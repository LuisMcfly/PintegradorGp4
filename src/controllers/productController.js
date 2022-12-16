let fs = require('fs')
const { Product, Category } = require('../../models/Index');
const fabricantes = JSON.parse(fs.readFileSync('DB/manufacturers.json', { encoding: 'utf-8' }));

const productCreate = (req, res) => {
    let image = []
    let colors = req.body.colors.toString()
    let rating = 0;
    if (req.files[0] != undefined) {
        for (let i = 0; i < req.files.length; i++) {
            image.push(req.files[i].filename)
        }
    } else {
        image = ['noImage.png'];
    }
    let images = image.toString();

    Product.create({ ...req.body, colors, rating, images })
        .then(() => res.render('products/productRegisterConclude'))
}

const productRegisterRender = async (req, res) => {
    // Consultar a la base de datos por las categorias
    const [Categorys] = await Promise.all([
        Category.findAll(),
    ])

    res.render('products/productRegister', {
        Categorys,
        fabricantes
    })

}

module.exports = {
    productCreate,
    productRegisterRender,
}