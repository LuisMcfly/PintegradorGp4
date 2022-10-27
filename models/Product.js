const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Propiedad = db.define('Propiedades', {
    id: {
        type: DataTypes.UUID(5),
        defaultValue: DataTypes.UUIDV4(5),
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    habitaciones: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publicado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = Propiedad;