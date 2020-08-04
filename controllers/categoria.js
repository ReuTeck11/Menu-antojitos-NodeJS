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

    // Instancia desde mi modelo Categoria
    const categoria = new Categoria(req.body);


    // Guardar cambios en la base de datos
    await categoria.save().then(res => {
        console.log(res);
        return res.status(200).json({
            ok: true,
            msg: 'La categoria se registro correctamente!',
            categoria: res
        });
    }).catch(err => {
        return res.status(500).json({
            ok: true,
            msg: 'Error al registrar categoria',
            err
        });
    });
};

const actualizarCategoria = async(req, res) => {

    const id = req.params.id;
    try {
        // Actualizar campos
        const campos = new Categoria(req.body);
        campos._id = id
        let error = campos.validateSync();

        if (error) {
            return res.status(400).json({
                ok: false,
                msg: 'Error de validacion',
                error
            });
        }

        const categoriaActualizada = await Categoria.findByIdAndUpdate(id, { $set: campos }, { new: true });

        if (!categoriaActualizada) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la categoria por ese id'
            });
        }
        return res.status(200).json({
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