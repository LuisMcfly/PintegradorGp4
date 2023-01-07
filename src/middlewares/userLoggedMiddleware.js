// const User = require('../../models/User')//se traen los usuarios para buscar el email
const User = require('../../models/User.js');
const Jwt = require('jsonwebtoken');
//pregunta si hay alguien en session para mostrar una parte de la barra de navegacion o no

async function userLoggedMiddleware(req, res, next) { //res.locals son vbles que se pueden compartir atravez de todas las vistas, este midd hace que toda la app tenga acceso a esta vble

    res.locals.isLogged = false//agregamos la variable isLogged a locals    
    const {_token} = req.cookies
    
    if(_token) {
        const decodedToken = Jwt.verify(req.cookies._token, process.env.JWT_SECRET)
        const userId = await User.scope('eliminarPassword').findByPk(decodedToken.id)
        const userInfo = await User.findByPk(userId.id);

        if (userInfo) {
            res.locals.isLogged = true;

            res.locals.userName = userInfo.fullName;
            res.locals.userImage = userInfo.image;
        }
    }

    next()
}

module.exports = userLoggedMiddleware