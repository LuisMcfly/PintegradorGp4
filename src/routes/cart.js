const express = require('express');
const router = express.Router();
const { 
    cartRender,
    addToCart,
    add1ToCart,
    subtract1FromCart,
    removeFromCart } = require('../controllers/cartController');

router.get('/', cartRender);

router.post('/addToCart/:id', addToCart);

router.post('/add1ToCart/:id', add1ToCart)
router.post('/subtract1FromCart/:id', subtract1FromCart)
router.post('/removeFromCart/:id', removeFromCart)

module.exports = router;