const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCamposCategoria = (req, res = response, next) => {

    // Validacion de campos obligatorios
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    next();
};

module.exports = {
    validarCamposCategoria
};