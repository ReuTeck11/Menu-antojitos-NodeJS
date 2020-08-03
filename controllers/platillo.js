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

const crearPlatillo = async(req, res) => {

    const { strNombre, strDescripcion, strIngredientes, nmbPiezas, nmbPrecio } = req.body



    // Instancia desde mi modelo Platillo
    const platillo = new Platillo(req.body);

    // Guardar cambios en la base de datos
    await platillo.save().then(resp => {
        console.log(resp);
        res.json({
            ok: true,
            platillo
        });
    }).catch(e => {
        console.log(e);

        res.json({
            ok: false,
            e: {
                message: 'El platillo ya ha sido registrado'
            }
        });
    });
};

module.exports = {
    getPlatillo,
    crearPlatillo
};