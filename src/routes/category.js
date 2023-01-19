const express = require('express')
const router = express.Router()
const {categoryRender} = require('../controllers/categoryController')
router.get('/', categoryRender)

module.exports = router
