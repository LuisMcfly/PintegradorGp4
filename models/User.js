const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/db.js');

const User = db.define('users', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        defaultValue: 'Sin Definir'
    },
    gender: {
        type: DataTypes.STRING,
        defaultValue: 'Sin Definir'
    },
    userType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'User'
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: 'defaultUserImage.png'
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
}, 
{
    hooks: {
        beforeCreate: async function(Usuario) {
            const salt = await bcrypt.genSalt(10);
            Usuario.password = await bcrypt.hash( Usuario.password, salt);
        }
    },
    scopes: {
        eliminarPassword:{
            attributes: {
                exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt']
            }
        }
    }
}
);

User.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password)
};

module.exports = User;