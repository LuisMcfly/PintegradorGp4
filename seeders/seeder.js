const { exit } = require('node:process');
const { Category, Features, Manofacturers } = require('../models/Index');
const category = require('./category');
const feature = require('./features');
const manofacturer = require('./manofacturer');
const db = require('../config/db');


const importData = async () => {
    try {
        // Autenticarnos en la base datos
        await db.authenticate();

        // Generar las columnas
        await db.sync();

        // Insertar los datos
        await Promise.all([
            Category.bulkCreate(category),
            Features.bulkCreate(feature),
            Manofacturers.bulkCreate(manofacturer)
        ]);
        
        console.log('Datos importados correctamente')
        exit();
    } catch (error) {
        console.log(error);
        exit(1)
    }
};

const deletData = async () => {
    try {
        await db.sync({force: true});
        console.log('Datos eliminados correctamente');
        exit();
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === "-i"){
    importData();
}

if(process.argv[2] === "-e"){
    deletData();
}