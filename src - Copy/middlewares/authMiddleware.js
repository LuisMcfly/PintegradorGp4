function authMiddleware(req, res, next) {//si no hay alguien en session cuando intente ingresar a la ruta donde este este midd lo redigira a login, en este caso si intenta entrar a profile
    if(!req.session.userLogged){
        return res.redirect('login')
    }
    next()
}

module.exports = authMiddleware