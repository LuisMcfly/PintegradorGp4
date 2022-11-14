
const {check, validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const {
    requestUserList,
    userSearch, 
    userWrite, 
    userErase} = require('../../models/User');
const { localsName } = require('ejs');

const registerRender = (req, res) => res.render('users/register');
const loginRender = (req, res) => res.render('users/login');

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

    let user = userSearch('email', email);
    
    if (user) { // revisar el uso de async y await para la validacion de usuario
        if(bcryptjs.compareSync(password, user.password)) {

            delete user.password;
            delete user.token;
            delete user.authenticated;
            
            req.session.userLogged = user;
            
            if(req.body.remember) {
                res.cookie('userEmail', req.body.email, {maxAge: 120000}) 
            } 
            
            return res.redirect('profile')

        } else {
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            })
        }
    }

    return res.render('users/login', {
        errors: {
            email:{
                msg: 'El email no se encuentra en la db'
            } 
        }
    })
    
}//end login

const profileRender = (req, res) => {
    res.render('users/userProfile', {us: req.session.userLogged});
}

const userCreate = (req, res) => {
    
    let errors = validationResult(req)

    if(!errors.isEmpty()){
        res.render('users/register', {errors: errors.mapped(), oldData: req.body})
    }
    if(req.body.password != req.body.repassword) {
        // validacion
        res.render('users/register')
    }

    let userData = { ...req.body, token: null, authenticated: false };
    let hashPassword = bcryptjs.hashSync(req.body.password, 10);
    userData.password = hashPassword;
    delete userData.repassword;
    
    userWrite(userData);

    res.render('users/register'); 
}

const editRender = (req, res) => {
    res.render("users/userEdit", {us: req.session.userLogged})
}

const userDelete = (req, res) => {
    userErase(req.params.id);
    res.send('Usuario Eliminado');
}

const logout = (req, res) => {
    res.clearCookie('userEmail')//elimina la cookie
    req.session.destroy()//borra todo lo que hay en session
    res.redirect('/')
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