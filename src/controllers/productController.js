let fs = require('fs')
const { uuid } = require('uuidv4')
const fabricantes = [{id: 1, name:'Lenovo'}, {id:2, name:'Asus'}, {id:3, name:'Dell'}, {id:4,name:'Logitec'}, {id:5,name:'RedDragon'}]
const productController = {
    productDetail: (req, res) => res.render('products/productDetail'),
    productRegister: (req, res) => res.render('products/productRegister', {fabricantes:fabricantes}),
    create: (req, res) => {
        let image 
        if(req.files[0]!=undefined){
            image=req.files[0].filename
        }else{
            image = ''
        }

        let product = 
            {id: uuid(),...req.body, image},
         products = '',
         productsFile = fs.readFileSync('products.json', {encoding: 'utf-8'})//trae lo que hay en en archivo, se parsea para poder usarlo en js
        if(productsFile == ''){
             products = []
        }else{
             products = JSON.parse(productsFile)
        }
        products.push(product)
        
        let productsJSON = JSON.stringify(products, null)
        fs.writeFileSync('products.json', productsJSON)
        res.redirect('productRegisterConclude')
    },
    productEdit: (req, res) => res.render('products/productEdit'),
    productRegisterConclude: (req, res) => res.render('products/productRegisterConclude'),
}

module.exports = productController;