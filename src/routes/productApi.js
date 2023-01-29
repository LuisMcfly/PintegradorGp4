const express = require('express');
const {body} = require('express-validator')//validaciones del form
const router = express.Router();
const path = require('path')
// const productController = require('../controllers/productController');
const {
    productShopRender,
    /* productDetailRender,
    productRegisterRender,
    productCreate,
    productEditRender,
    productEdit,
    deletProduct,
    productDeleteRender */
    
} = require('../controllers/productControllerApi');


const multer = require('multer'),
    storage =  multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, path.join('public','img','uploads'))
        },
        filename: (req, file, cb)=>{
            cb(null, file.originalname)
        }
    })
    const upload = multer({storage:storage})/* definir si se valida la imagen con multer o con expv */

router.get('/', productShopRender);

/* router.get('/productRegister', productRegisterRender); //renderiza la vista del form
router.post('/productRegister', upload.array('imagen'), productCreate); //guarda los datos enviados en el form

router.get('/productDetail/:id', productDetailRender);
router.get('/productEdit/:id', productEditRender);
router.post('/productEdit/:id', productEdit);

router.get('/productDelete/:id', productDeleteRender)
router.post('/productDelete/:id', deletProduct);
 */
module.exports = router;