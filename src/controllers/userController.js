const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../../config/db.js');
const Usuario = require('../../models/Usuario.js');
const { generarId } = require('../../helpers/tokens.js');

const registerRender = (req, res) => res.render('users/register', {
                errores: [],
                usuario: ''
});

const userCreate = async (req, res) => {
    // Validacion
    await check('fullName').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener por lo menos 6 caracteres').run(req)
    await check('repassword').equals(req.body.password).withMessage('Las contraseñas no son iguales').run(req)

    //Mostrar errores y hacer la validacion
    let resultado = validationResult(req)
    console.log(resultado)
    //Verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        return res.render('users/register', {
                errores: resultado.array(),
                usuario: {
                    fullName: req.body.fullName,
                    email: req.body.email,
                    phone: req.body.phone
                }
        })
    }
    
    const { fullName, email, password, phone } = req.body;

    // Almacenar un usuario
    const usuarioC = await Usuario.create({
        fullName,
        email,
        password,
        phone,
        token: generarId()
    })

}



const loginRender = (req, res) => res.render('users/login');
const editRender = (req, res) => res.render("users/userEdit", {us: req.session.userLogged});
const profileRender = ( req, res ) => {}

const userLogin = (req, res) => {
}

const userDelete = (req, res) => {

}

const logout = (req, res) => {

}

module.exports = {
    logout,
    registerRender,
    loginRender,
    profileRender,
    userLogin,
    userCreate,
    userDelete,
    editRender
};