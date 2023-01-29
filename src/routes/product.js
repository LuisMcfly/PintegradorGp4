const express = require('express');
const {body} = require('express-validator')//validaciones del form
const router = express.Router();
const path = require('path')
// const productController = require('../controllers/productController');
const {
    productShopRender,
    productDetailRender,
    productRegisterRender,
    productEditRender,
    productDeleteRender,
    productCreate,
    productEdit,
    productDelete,
} = require('../controllers/productController');


const multer = require('multer'),
    storage =  multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, path.join('public','img','uploads','products'))
        },
        filename: (req, file, cb)=>{
            cb(null, file.originalname)
        }
    })
    const upload = multer({storage:storage})

router.get('/', productShopRender);

router.get('/productRegister', productRegisterRender); //renderiza la vista del form
router.get('/productDetail/:id', productDetailRender);
router.get('/productEdit/:id', productEditRender);
router.get('/productDelete/:id', productDeleteRender)

router.post('/productRegister', upload.array('uploadImage'), productCreate); //guarda los datos enviados en el form
router.post('/productEdit/:id', upload.array('uploadImage'), productEdit);
router.post('/productDelete/:id', productDelete);

module.exports = router;