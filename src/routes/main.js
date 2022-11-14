const express = require('express');
const router = express.Router();
// const mainController = require('../controllers/mainController');
const { indexRender } = require('../controllers/mainController');

router.get('/', indexRender);
router.get('/home', indexRender);

module.exports = router;