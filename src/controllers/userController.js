const registerRender = (req, res) => res.render('users/register');
const registerConcludeRender = (req, res) => { 
        res.render('users/registerConclude')//se debe enviar el ultimo usuario registrado
    };
const loginRender = (req, res) => res.render('users/login');


module.exports = {
    registerRender,
    registerConcludeRender,
    loginRender
};