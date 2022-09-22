const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/productDetail', productController.productDetail);
router.get('/productRegister', productController.productRegister);
router.get('/productEdit', productController.productEdit);

module.exports = router;