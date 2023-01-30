const { Product, Category, Manofacturers, Features } = require('../../models/index');

const categoryRender = async (req, res) => {
    const [categories] = await Promise.all([Category.findAll()])
    
    return await res.status(200).json({
        total: categories.length,
        data: categories,
        status: 200 
    })
}

const add = async (req, res) => {
    //res.send('yeah bb')
    try {
        const categorytSave = await Category.create({...req.body})
          
        res.status(200).json({
            data: categorytSave,
            message: 'Success!'
        })
    } catch (error) {
        console.log(error);
    }
}

//editar
const categoryUpdate = async (req, res) => {
    const { id } = req.params;

    // Validacion de que el producto si existe
    const category = await Category.findByPk(id);

    if(!category)  return
    
    try {
        
        category.set({
            ...req.body,
            //name: req.body
        })

        await category.save();
        res.status(200).json({
            messaage: 'Updated success!',
            data: category
        })
    } catch (error) {
        console.log(error);
    }
}

//eliminar
const categoryDelete = async (req, res) => {
    //res.send('aja')
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        await category.destroy();
        res.status(200).json({
            data: category,
            message: 'Delete success!'
        })
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    categoryRender,
    add,
    categoryUpdate,
    categoryDelete
}