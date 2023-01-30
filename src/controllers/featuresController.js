const { Product, Category, Manofacturers, Features } = require('../../models/index');

/* const categoryRender = async (req, res) => {
    const [categories] = await Promise.all([Category.findAll()])
    
    return await res.status(200).json({
        total: categories.length,
        data: categories,
        status: 200 
    })
} */

const addFeature = async (req, res) => {
    //res.send('yeah bb')
    try {
        const featureStorage = await Features.create({...req.body})
          
        res.status(200).json({
            data: featureStorage,
            message: 'Success!'
        })
    } catch (error) {
        console.log(error);
    }
}

//editar
const featureUpdate = async (req, res) => {
    const { id } = req.params;

    // Validacion de que el producto si existe
    const feature = await Features.findByPk(id);

    if(!feature)  return
    
    try {
        
        feature.set({
            ...req.body,
            //name: req.body
        })

        await feature.save();
        res.status(200).json({
            messaage: 'Updated success!',
            data: feature
        })
    } catch (error) {
        console.log(error);
    }
}

//eliminar
const featureDelete = async (req, res) => {
    //res.send('aja')
    try {
        const { id } = req.params;

        const feature = await Features.findByPk(id);

        await feature.destroy();
        res.status(200).json({
            data: feature,
            message: 'Delete success!'
        })
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    addFeature,
    featureUpdate,
    featureDelete
}