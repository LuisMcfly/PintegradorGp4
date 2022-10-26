let {userWrite} = require('../../models/User');
const {validationResult} = require('express-validator')


const registerRender = (req, res) => res.render('users/register');
const loginRender = (req, res) => res.render('users/login');
const userCreate = (req, res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.render('users/register', {errors: errors.mapped(), oldData: req.body})
    }

    userWrite(req.body);
    res.render('users/registerConclude');
}

module.exports = {
    registerRender,
    loginRender,
    userCreate
};