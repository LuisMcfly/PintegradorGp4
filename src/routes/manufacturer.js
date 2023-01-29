const express = require('express')
const router = express.Router()
const {
    manufacturerList,
    addManufacturer,
    manufacturerUpdate,
    manufacturerDelete
} = require('../controllers/manufacturerController')

router.get('/', manufacturerList)
router.post('/addManufacturer', addManufacturer)
router.put('/:id', manufacturerUpdate)
router.delete('/:id', manufacturerDelete)

module.exports = router

