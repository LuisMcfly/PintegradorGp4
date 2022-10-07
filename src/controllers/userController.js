const userController = {
    register: (req, res) => res.render('users/register'),
    registerConclude: (req, res) => { 
        res.render('users/registerConclude')//se debe enviar el ultimo usuario registrado
    },
    login: (req, res) => res.render('users/login')
}

module.exports = userController;