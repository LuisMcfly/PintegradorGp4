const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

// const Manufacturers = db.define('manufacturers', {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
// },
// );

const Manufacturers = db.define('manufacturers', {
    idx: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING
    }
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
});

module.exports = Manufacturers;