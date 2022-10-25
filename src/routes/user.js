const express = require('express');
const router = express.Router();
const {
    registerRender,
    registerConcludeRender,
    loginRender
} = require('../controllers/userController');

router.get('/register', registerRender);
router.get('/registerConclude', registerConcludeRender);
router.get('/login', loginRender);

module.exports = router;