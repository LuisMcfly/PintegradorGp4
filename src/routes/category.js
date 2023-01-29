const express = require('express')
const router = express.Router()
const {
    categoryRender,
    add,
    categoryUpdate,
    categoryDelete
} = require('../controllers/categoryController')

router.get('/', categoryRender)
router.post('/add', add)
router.put('/:id', categoryUpdate)
router.delete('/:id', categoryDelete)

module.exports = router
