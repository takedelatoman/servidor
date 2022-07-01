const Category = require('../models/category');
const { getAll } = require('./usersController');

module.exports = {

    async getAll(req, res, next){

        try {
            const data = await Category.getAll();
            console.log(`Categorias ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al tratar obtener las categorias',
                error: error,
                success: false
            })
        }

    },

    async create(req, res, next){
        try {
            const category = req.body;
            console.log(`Categoria enviada: ${category}`);

            const data = await Category.create(category);

            return res.status(201).json({
                message: 'la categoria se creó correctamente',
                success: true,
                data: data.id

            });
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al crear la categoria',
                success: false,
                error: error
            });
        }

    }
}