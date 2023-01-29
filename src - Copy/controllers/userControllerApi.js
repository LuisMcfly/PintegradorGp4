const User = require('../../models/User.js');

const Jwt = require('jsonwebtoken');
const { uploadsPath } = require('../../helpers/filePaths')


const getUsersApi = async (req, res) => {
    
    const [users] = await Promise.all([User.findAll()])
    
    return await res.status(200).json({
        total: users.length,
        data: users,
        status: 200 
    })
}

module.exports = {
    getUsersApi
}