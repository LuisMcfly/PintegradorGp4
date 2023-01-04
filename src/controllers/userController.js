const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../../config/db.js');
const User = require('../../models/User.js');
const { generarId, generarJWT } = require('../../helpers/tokens.js');
const Jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');

const registerRender = (req, res) => res.render('users/register', {
    errors: [],
    usuario: ''
});

const loginRender = (req, res) => res.render('users/login', {errors: []});

const profileRender = async ( req, res ) => {
    return getUserInfo(req, res, 'users/userProfile')
}

const editRender = async (req, res) => {
    return getUserInfo(req, res, 'users/userEdit')
}

const userCreate = async (req, res) => {
    const { fullName, email, password, phone } = req.body;

    // Verificar que el usuario no este en la base de datos
    const existeUsuario = await User.findOne( { where : { email } })
    
    if(existeUsuario) {
        return res.render('users/login', {
            errors: {email: {msg: 'El correo ya está Registrado'}}, 
            usuario: {
                nombre: req.body.fullName,
                email: req.body.email
            }
        });
    }

    // Validaciones
    await check('fullName').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener por lo menos 6 caracteres').run(req)
    await check('repassword').equals(req.body.password).withMessage('Las contraseñas no son iguales').run(req)
    await check('phone').isLength({ min: 10 }).withMessage('El numero de telefono debe ser de 10 digitos').run(req)
    await check('termsAndConditions').equals("on").withMessage('Debes aceptar los términos y condiciones').run(req)
    
    //Mostrar errores y hacer la validacion
    let resultado = validationResult(req)

    // res.send(resultado.mapped())

    //Verificar que el resultado no este vacio
    if(!resultado.isEmpty()) {
        return res.render('users/register', {
            errors: resultado.mapped(),
            usuario: {
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone
            }
        })
    }

    // Almacenar un usuario
    await User.create({
        fullName,
        email,
        password,
        phone,
        image: "defaultUserImage.png",
        token: generarId()
    })
    res.redirect('../users/login');
}

const userLogin = async (req, res) => {
    // Validacion
    await check('email').isEmail().withMessage('Debes ingresar una dirección de correo válida').run(req)
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req)

    let resultado = validationResult(req)

    // res.send(req.body) // Debugging
    // res.send(resultado.mapped()) // Debugging

    // Enviar mensaje de error si existe
    if(!resultado.isEmpty()){
        return res.render('users/login', {
            // errores: resultado.array(),
            errors: resultado.mapped(),
        })
    }
    
    // Comprobar si el usuario existe
    const {email, password} = req.body;

    const usuario = await User.findOne({where : {email}});

    if(!usuario){
        return res.render('users/login', {
            errors: {email: {msg: 'El usuario no existe'}}
        })
    }

    // Revisar el password
    if(!usuario.verificarPassword(password)){
        return res.render('users/login', {
            errors: {password: {msg: 'La contraseña es incorrecta'}}
        })
    }

    // Autenticar al usuario
    const token = generarJWT({id: usuario.id, fullName: usuario.fullName, 
        phone: usuario.phone, email: usuario.email});
    
    // Almacenar en un cookie
    return res.cookie('_token', token, {
        httpOnly: true
        // secure: true,
        // sameSite: true
    }).redirect('/')
}

const userEdit = async (req, res) => {
    await User.update({

    })
    return res.redirect('../users/profile');
}

const logout = (req, res) => {
    return res.clearCookie('_token').status(200).redirect('/');
}

const getUserInfo = async (req, res, pageToRender) => {
    const { _token } = req.cookies
    if(!_token) {
        return res.redirect('../users/login')
    }
    
    try {
        const decoded = Jwt.verify(_token, process.env.JWT_SECRET)
        const usuarioId = await User.scope('eliminarPassword').findByPk(decoded.id)
    
        // Validar que el usuario y buscarlo en la base de datos
        const usuario = await User.findByPk(usuarioId.id);

        // res.send(usuario.address)
        if(!usuario.hasOwnProperty('address')) usuario.address = "Sin definir";
        if(!usuario.hasOwnProperty('gender')) usuario.gender = "Sin definir";
        
        // res.send(usuario);  
        return res.render(pageToRender, {usuario})
    } catch (error) {
        return res.clearCookie('_token').redirect('../users/login')
    }
}

module.exports = {
    registerRender,
    loginRender,
    profileRender,
    editRender,
    userLogin,
    userCreate,
    userEdit,
    logout
};