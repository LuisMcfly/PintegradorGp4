module.exports = (sequelize, DataTypes) => {
    let tableName = 'usuarios';
    let tableAtributes = {
        nombre: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING }
    };

    const Us = sequelize.define(tableName, tableAtributes)
    return Usuario;
};

const Sequelize = require('sequelize');
const sequelize = require('../database'); 

const Usuario = sequelize.define(
    'usuarios',
    {
        nombre: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING }
    }
);

module.exports = Usuario;