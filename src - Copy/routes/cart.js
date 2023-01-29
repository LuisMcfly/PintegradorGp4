const express = require('express');
const router = express.Router();
const { cartRender } = require('../controllers/cartController');

router.get('/', cartRender);

module.exports = router;