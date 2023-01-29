const express = require('express')
const router = express.Router()
const {
    addFeature,
    featureUpdate,
    featureDelete
} = require('../controllers/featuresController')

router.post('/addFeature', addFeature)
router.put('/:id', featureUpdate)
router.delete('/:id', featureDelete)

module.exports = router
