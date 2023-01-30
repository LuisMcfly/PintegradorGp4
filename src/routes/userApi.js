const express = require('express')
const router = express.Router()

const {getUsersApi} = require('../controllers/userControllerApi.js')

router.get('/', getUsersApi)

module.exports = router;
