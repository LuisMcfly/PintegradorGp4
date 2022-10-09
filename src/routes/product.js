const express = require('express');
const router = express.Router();
const path = require('path')
const productController = require('../controllers/productController');
/* */
const multer = require('multer'),
    storage =  multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, path.join('public','img','uploads'))
        },
        filename: (req, file, cb)=>{
            cb(null, file.originalname)
        }
    })


const upload = multer({storage:storage}).array('imagen')

router.get('/', productController.productShop);
router.delete('/:id', productController.productDelete)
router.get('/productRegister', productController.productRegister); //renderiza la vista del form
router.post('/productRegister', upload, productController.create); //guarda los datos enviados en el form

router.get('/productDetail/:id', productController.productDetail);
router.get('/productEdit', productController.productEdit);
router.get('/productRegisterConclude', productController.productRegisterConclude);

module.exports = router;