const express = require('express');
const router = express.Router();
const {
    registerRender,
    loginRender,
    userCreate
} = require('../controllers/userController');

router.get('/register', registerRender);
router.get('/login', loginRender);

router.post('/register', userCreate);

module.exports = router;