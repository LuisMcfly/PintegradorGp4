const express = require('express');
const router = express.Router();
const {
    registerRender,
    loginRender,
    profileRender,
    userLogin,
    userCreate,
    userDelete
} = require('../controllers/userController');

router.get('/register', registerRender);
router.get('/login', loginRender);
router.get('/profile/:id', profileRender)

router.post('/login', userLogin)
router.post('/register', userCreate);
router.delete('/delete/:id', userDelete);

module.exports = router;