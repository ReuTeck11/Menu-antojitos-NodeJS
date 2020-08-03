const Categoria = require('../models/categoria');
const { response } = require('express');

// Obtener datos de la categoria.
const getCategoria = async(req, res) => {

    // Filtracion y extraccion de campos especificos
    const categorias = await Categoria.find({}, 'strNombre strDescripcion');
    res.json({
        ok: true,
        categorias
    });
};

// Creacion de una categoria
const crearCategoria = async(req, res) => {
    const { strNombre, strDescripcion } = req.body

    // Instancia desde mi modelo Categoria
    const categoria = new Categoria(req.body);


    // Guardar cambios en la base de datos
    await categoria.save().then(res => {
        console.log(res);
        res.json({
            ok: true,
            categoria
        });
    }).catch(e => {
        console.log(e);

        res.json({
            ok: true,
            e: {
                message: 'La categoria ya ha sido registrada'
            }
        });
    });
};


const actualizarCategoria = async(req, res = response) => {

    const id = req.params.id;


    try {

        const categoriaDB = await Categoria.findById(id);

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la categoria por ese id'
            });
        }

        // Actualizar campos
        const campos = req.body;
        delete campos.strNombre;
        delete campos.strDescripcion;

        const categoriaActualizada = await Categoria.findByIdAndUpdate(id, campos, { new: true });

        res.json({
            ok: true,
            categoria: categoriaActualizada

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};

module.exports = {
    getCategoria,
    crearCategoria,
    actualizarCategoria
};