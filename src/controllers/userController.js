let {userWrite} = require('../../models/User');

const registerRender = (req, res) => res.render('users/register');
const loginRender = (req, res) => res.render('users/login');
const userCreate = (req, res) => {
    userWrite(req.body);
    res.render('users/registerConclude');
}

module.exports = {
    registerRender,
    loginRender,
    userCreate
};