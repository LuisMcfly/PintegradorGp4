const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../../config/db.js');
const Usuario = require('../../models/Usuario.js');
const { generarId, generarJWT } = require('../../helpers/tokens.js');
const Jwt = require('jsonwebtoken');

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
    await check('phone').isLength({ min: 10 }).withMessage('El numero de telefono debe ser de 10 digitos').run(req)
    
    //Mostrar errores y hacer la validacion
    let resultado = validationResult(req)

    //Verificar que el resultado no este vacio
    if(!resultado.isEmpty()){
        return res.render('users/register', {
                errores: resultado.mapped(),
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
            errores: [{msg: 'El Usuario ya está Registrado'}], 
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
    await check('email').isEmail().withMessage('Debes ingresar una dirección de correo válida').run(req)
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req)

    let resultado = validationResult(req)
    
    // res.send(resultado.mapped())

    // Enviar mensaje de error si existe
    if(!resultado.isEmpty()){
        
        return res.render('users/login', {
            // errores: resultado.array(),
            errores: resultado.mapped(),
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

    // Autenticar al usuario
    const token = generarJWT({id: usuario.id, fullName: usuario.fullName, 
        phone: usuario.phone, email: usuario.email});
    

    // Almacenar en un cookie
    return res.cookie('_token', token, {
        httpOnly: true
        // secure: true,
        // sameSite: true
    }).redirect('/profile')
}

const profileRender = async ( req, res ) => {
    // Verificar si hay un token
    const { _token } = req.cookies
    if(!_token) {
        return res.redirect('/users/login')
    }
    // Comprobar el token
    try {
        const decoded = Jwt.verify(_token, process.env.JWT_SECRET)
        const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id)

        
        return res.render('users/userProfile', {usuario})
    } catch (error) {
        return res.clearCookie('_token').redirect('/users/login')
    }  
}


const editRender = async (req, res) => {
    
    // Comprobar el token   
    const { _token } = req.cookies
    if(!_token) {
        return res.redirect('/users/login')
    }
    
    try {
        const decoded = Jwt.verify(_token, process.env.JWT_SECRET)
        const usuarioId = await Usuario.scope('eliminarPassword').findByPk(decoded.id)
    
        // Validar que el usuario y buscarlo en la base de datos
        const usuario = await Usuario.findByPk(usuarioId.id);
        res.render('users/userEdit', {usuario})
    } catch (error) {
        return res.clearCookie('_token').redirect('/users/login')
    }  
    
}

const logout = (req, res) => {
    return res.clearCookie('_token').status(200).redirect('/');
}

module.exports = {
    logout,
    registerRender,
    loginRender,
    profileRender,
    userLogin,
    userCreate,
    editRender
};