const express = require('express');
const { search } = require('../controllers/appController.js');
const router = express.Router();

// Buscador 
router.post('/buscador', search)

module.exports = router;
