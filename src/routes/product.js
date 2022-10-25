const express = require('express');
const router = express.Router();
const path = require('path')
// const productController = require('../controllers/productController');
const {
    productShopRender,
    productDetailRender,
    productRegisterRender,
    productCreate,
    productEditRender,
    productUpdate,
    productDelete,
    productRegisterConclude
} = require('../controllers/productController');


const multer = require('multer'),
    storage =  multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, path.join('public','img','uploads'))
        },
        filename: (req, file, cb)=>{
            cb(null, file.originalname)
        }
    })

const upload = multer({storage:storage})

router.get('/', productShopRender);
router.get('/productRegister', productRegisterRender); //renderiza la vista del form
router.post('/productRegister', upload.array('imagen'), productCreate); //guarda los datos enviados en el form

router.get('/productDetail/:id', productDetailRender);
router.get('/productEdit/:id', productEditRender);
router.put('/:id', upload.array('imagen'), productUpdate);
router.delete('/:id', productDelete);
router.get('/productRegisterConclude', productRegisterConclude);

module.exports = router;