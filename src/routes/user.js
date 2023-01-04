const express = require('express');
const router = express.Router();
const {
    registerRender,
    loginRender,
    profileRender,
    userLogin,
    userCreate,
    editRender,
    userEdit,
    logout
} = require('../controllers/userController');

router.get('/register', registerRender);
router.post('/register', userCreate);

router.get('/login', loginRender);
router.post('/login', userLogin);

router.get('/profile', profileRender);
router.get('/edit', editRender);
router.post('/editInfo', userEdit);

router.post('/logout', logout);

module.exports = router;