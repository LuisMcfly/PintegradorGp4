const User = require('../../models/User')//se traen los usuarios para buscar el email
//pregunta si hay alguien en session para mostrar una parte de la barra de navegacion o no
function userLoggedMiddleware(req, res, next) {//res.locals son vbles que se pueden compartir atravez de todas las vostas, este midd hace que toda la app tenga acceso a esta vble
    res.locals.isLogged = false//agregamos la variable isLogged a locals

    let emailInCookie = req.cookies.userEmail
    let userFromCookie = User.userSearch('email', emailInCookie)
    
    if(userFromCookie){
        req.session.userLogged = userFromCookie
    }

    if(req.session && req.session.userLogged){
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    }
    next()
}

module.exports = userLoggedMiddleware