const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/productDetail', productController.productDetail);

module.exports = router;