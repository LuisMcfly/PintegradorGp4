const express = require('express');
const {body} = require('express-validator')//validaciones del form
const router = express.Router();
const path = require('path')
const multer = require('multer')

const productController = require('../controllers/productController');

/*Multer para subir archivos, imagenes al servidor */


/*Validaciones con express-validator */
const validacionesRegister = [
    body('name').notEmpty().withMessage('Este campo es requerido, por favor ingrese el nombre del producto'),//se debe retirar el required del input
    body('manufacturer').notEmpty().withMessage('Este campo es requerido, por favor ingrese la marca del producto'),
    body('model').notEmpty().withMessage('Este campo es requerido, por favor ingrese la marca del producto'),
    body('variations').notEmpty().withMessage('Este campo es requerido, por favor ingrese las variaciones del prodcuto '),
    body('category').notEmpty().withMessage('Este campo es requerido, por facor ingrese la categoria del producto'),
    body('description').notEmpty().withMessage('Este campo es requerido, por favor ingrese la categoria del producto'),
    body('price').notEmpty().withMessage('Este campo es requerido, por favor ingrese el precio del producto'),
    body('price').isInt().withMessage('Este campo es numérico, por favor ingrese el precio en números'),
    body('discount').notEmpty().withMessage('Este campo es requerido, por favor ingrese el descuento del producto'),
    body('discount').isInt().withMessage('Este campo es numérico, por favor ingrese el descuento en números'),
    body('stock').notEmpty().withMessage('Este campo es requerido, po favor ingrese las unidades disponibles que hay del producto'),
    body('stock').isInt().withMessage('Este campo es numérico, por favor ingrese las unidades disponibles en números'),
    body('colors').notEmpty().withMessage('Este campo es requerido, por favor elija por lo menos un color'),
    //body('imagen').notEmpty().withMessage('Este campo es requerido, po favor seleccione por lo menos una imégen')//
]

/*configuracion multer */
    const storage =  multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, path.join('public','img','uploads'))
        },
        filename: (req, file, cb)=>{
            cb(null, file.originalname)
        }
    })
    const upload = multer({storage:storage})/* definir si se valida la imagen con multer o con expv */

/*rutas */
router.get('/', productController.productShop);
router.get('/productRegister', productController.productRegister); //renderiza la vista del form
router.post('/productRegister',  upload.array('imagen'), validacionesRegister, productController.create); //guarda los datos enviados en el form
router.get('/productDetail/:id', productController.productDetail);
router.get('/productEdit/:id', productController.productEdit);
router.put('/:id', upload.array('imagen'), productController.productUpdate);
router.delete('/:id', productController.productDelete);
router.get('/productRegisterConclude', productController.productRegisterConclude);

module.exports = router;