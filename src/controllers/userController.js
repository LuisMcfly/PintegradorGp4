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

    //Verificar que el resultado no este vacio
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

    // Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne( { where : { email } })
    if(existeUsuario) {
        return res.render('users/register', {
            errores: [{msg: 'El Usuario ya esta Registrado'}], 
            usuario: {
                nombre: req.body.fullName,
                email: req.body.email
            }
        })
    }

    // Almacenar un usuario
    const usuarioC = await Usuario.create({
        fullName,
        email,
        password,
        phone,
        token: generarId()
    })

}

const loginRender = (req, res) => res.render('users/login', {
    errores: []
});

const userLogin = async (req, res) => {
    // Validacion
    await check('email').isEmail().withMessage('El email es obligatorio').run(req)
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req)

    let resultado = validationResult(req)

    //Verificar que el resultado no este vacio
    if(!resultado.isEmpty()){
        return res.render('users/login', {
                errores: resultado.array(),
        })
    }

    // Comprobar si el usuario existe

    const {email, password} = req.body;

    const usuario = await Usuario.findOne({where : {email}});
    if(!usuario){
        return res.render('users/login', {
            errores: [{msg: 'El usuario no existe'}]
        })
    }

    // Revisar el password

    if(!usuario.verificarPassword(password)){
        return res.render('users/login', {
            errores: [{msg: 'La contraseña es incorrecta'}]
        })
    }

    res.redirect('/')
}


const editRender = (req, res) => res.render("users/userEdit", {us: req.session.userLogged});
const profileRender = ( req, res ) => {}

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