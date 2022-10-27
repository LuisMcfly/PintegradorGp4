function guestMiddleware(req, res, next) {//si ya esta logueado sera redirigido a profile, no puede entrar a login ni register
    if(req.session.userLogged){
        return res.redirect('profile')
    }
    next()
}

module.exports = guestMiddleware