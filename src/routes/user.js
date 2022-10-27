const express = require('express');
const {body} =require('express-validator')
const router = express.Router();
const {
    registerRender,
    loginRender,
    profileRender,
    userLogin,
    userCreate,
    userDelete
} = require('../controllers/userController');

const validaciones = [
    body('fullName').notEmpty().withMessage('Este campo es requerido, por favor ingrese su nombre'),
    body('email').isEmail().withMessage('Debe tener un formato de email'),
    body('password').notEmpty().withMessage('Este campo es requerido, por favor ingrese el passwors'),
    body('repassword').notEmpty().withMessage('Este campo es requerido, por favor ingrese de nuevo su password'),
    body('phone').notEmpty().withMessage('Este campo es requerido, por favor ingrese el numero celular'),
]



router.get('/register',  registerRender);

router.get('/login', loginRender);
router.get('/profile/:id', profileRender)

router.post('/register', validaciones, userCreate);
router.post('/login', userLogin)
router.post('/register', userCreate);
router.delete('/delete/:id', userDelete);

module.exports = router;