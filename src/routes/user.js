const express = require('express');
const router = express.Router();
const {
    registerRender,
    loginRender,
    profileRender,
    userLogin,
    userCreate,
    logout,
    editRender
} = require('../controllers/userController');

router.get('/register', registerRender);
router.post('/register', userCreate);

router.get('/login', loginRender);
router.post('/login', userLogin);

router.get('/profile', profileRender);
router.get('/edit', editRender);

router.post('/logout', logout);

module.exports = router;