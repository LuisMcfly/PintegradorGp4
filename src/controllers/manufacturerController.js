const { Product, Category, Manufacturer, Features } = require('../../models/index');

const manufacturerList = async (req, res) => {
    const [manufacturer] = await Promise.all([Manufacturer.findAll()])
    
    return await res.status(200).json({
        total: manufacturer.length,
        data: manufacturer,
        status: 200 
    })
} 

const addManufacturer = async (req, res) => {
    try {
        const manufacturerStorage = await Manufacturer.create({...req.body})
          
        res.status(200).json({
            data: manufacturerStorage,
            message: 'Success!'
        })
    } catch (error) {
        console.log(error);
    }
}

//editar
const manufacturerUpdate = async (req, res) => {
    const { id } = req.params;

    // Validacion de que si existe
    const manufacturer = await Manufacturer.findByPk(id);

    if(!manufacturer)  return
    
    try {
        
        manufacturer.set({
            ...req.body,
        })

        await manufacturer.save();
        res.status(200).json({
            messaage: 'Updated success!',
            data: manufacturer
        })
    } catch (error) {
        console.log(error);
    }
}

//eliminar
const manufacturerDelete = async (req, res) => {
    //res.send('aja')
    try {
        const { id } = req.params;

        const manufacturer = await Manufacturer.findByPk(id);

        await manufacturer.destroy();
        res.status(200).json({
            data: manufacturer,
            message: 'Delete success!'
        })
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    manufacturerList,
    addManufacturer,
    manufacturerUpdate,
    manufacturerDelete
}