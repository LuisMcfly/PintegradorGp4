const express = require('express');
const {body} =require('express-validator')
const router = express.Router();
const {
    registerRender,
    loginRender,
    profileRender,
    userLogin,
    userCreate,
    userDelete,
    logout,
    editRender
} = require('../controllers/userController');

const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const validaciones = [
    body('fullName').notEmpty().withMessage('Este campo es requerido, por favor ingrese su nombre'),
    body('email').isEmail().withMessage('Debe tener un formato de email'),
    body('password').notEmpty().withMessage('Este campo es requerido, por favor ingrese el passwors'),
    body('repassword').notEmpty().withMessage('Este campo es requerido, por favor ingrese de nuevo su password'),
    body('phone').notEmpty().withMessage('Este campo es requerido, por favor ingrese el numero celular'),
]

router.get('/register', guestMiddleware,  registerRender);
router.get('/login', guestMiddleware, loginRender);
//router.get('/profile/:id', profileRender)
router.get('/profile', authMiddleware, profileRender)
router.get('/edit', authMiddleware, editRender)

router.post('/register',  validaciones, userCreate);
router.post('/login',  userLogin)
router.post('/register', userCreate);
router.delete('/delete/:id', userDelete);

router.get('/logout', logout)//falta btn que haga esto

module.exports = router;