const Platillo = require('../models/platillo');
const { validationResult } = require('express-validator');

// Obtener datos del platillo.
const getPlatillo = async(req, res) => {

    // Filtracion y extraccion de campos especificos
    const platillos = await Platillo.find({}, 'strNombre strDescripcion strIngredientes nmbPiezas nmbPrecio');

    res.json({
        ok: true,
        platillos
    });
};

// Creacion de un platillo
const crearPlatillo = async(req, res) => {

    // Instancia desde mi modelo Platillo
    const platillo = new Platillo(req.body);


    // Guardar cambios en la base de datos
    await platillo.save().then(res => {
        console.log(res);
        return res.status(200).json({
            ok: true,
            msg: 'El platillo se registro correctamente!',
            categoria: res
        });
    }).catch(err => {
        return res.status(500).json({
            ok: true,
            msg: 'Error al registrar platillo',
            err
        });
    });
};

const actualizarPlatillo = async(req, res) => {

    const id = req.params.id;
    try {
        // Actualizar campos
        const campos = new Platillo(req.body);
        campos._id = id
        let error = campos.validateSync();

        if (error) {
            return res.status(400).json({
                ok: false,
                msg: 'Error de validacion',
                error
            });
        }

        const platilloActualizado = await Platillo.findByIdAndUpdate(id, { $set: campos }, { new: true });

        if (!platilloActualizado) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el platillo por ese id'
            });
        }
        return res.status(200).json({
            ok: true,
            platillo: platilloActualizado
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};

module.exports = {
    getPlatillo,
    crearPlatillo,
    actualizarPlatillo
};