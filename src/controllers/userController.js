const {check, validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const {
    requestUserList,
    userSearch, 
    userWrite, 
    userErase} = require('../../models/User');

const registerRender = (req, res) => res.render('users/register');
const loginRender = (req, res) => res.render('users/login');
const profileRender = (req, res) => {
    res.render('users/userProfile');// falta terminar el proceso de login
};
const userLogin = (req, res) => {
    // check('email').isEmail().withMessage('El email es obligatorio').run(req)
    // check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req)

    // let resultado = validationResult(req)

    // //Verificar que el resultado no este vacio
    // if(!resultado.isEmpty()){
    //     return res.render('auth/login', {
    //             pagina: 'Iniciar Sesión',
    //             errores: resultado.array(),
    //     })
    // }

    let {email, password} = req.body;
    // res.send('el usuario con correo ' + email + ' y contrasena ' + password);

    let user = userSearch('email', email);
    // res.send(user);
    if (user) { // revisar el uso de async y await para la validacion de usuario
        if(bcryptjs.compareSync(password, user.password)) {

            delete user.password;
            delete user.token;
            delete user.authenticated;
            
            req.session.idioma = 'hola';// NO HACE ASIGNACIÓN, PREGUNTAR AL PROFE
            res.send(req.session.idioma);
            // res.render('users/userProfile')
        }
        else {
            res.send('la contraseña no es correcta');
        }
    }
    res.send('no existe un usuario con ese correo');
    
    
}
const userCreate = (req, res) => {
    let userData = { ...req.body, token: null, authenticated: false };
    let hashPassword = bcryptjs.hashSync(req.body.password, 10);
    userData.password = hashPassword;
    delete userData.repassword;
    
    userWrite(userData);
    res.render('users/registerConclude');
}
const userDelete = (req, res) => {
    userErase(req.params.id);
    res.send('Usuario Eliminado');
}

module.exports = {
    registerRender,
    loginRender,
    profileRender,
    userLogin,
    userCreate,
    userDelete
};