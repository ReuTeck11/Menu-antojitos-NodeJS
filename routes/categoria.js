/* 
    Ruta: api/categoria
*/

const { Router } = require('express');

const { check } = require('express-validator');

const { validarCamposCategoria } = require('../middlewares/validar-campos-categoria');

const { getCategoria, crearCategoria, actualizarCategoria } = require('../controllers/categoria');

const router = Router();


router.get('/', getCategoria);


router.post('/', [
        check('strNombre').not().isEmpty(),
        check('strDescripcion').not().isEmpty(),
        validarCamposCategoria,
    ],
    crearCategoria
);

router.put('/:id', [
        check('strNombre').not().isEmpty(),
        check('strDescripcion').not().isEmpty()
    ],
    actualizarCategoria);



module.exports = router;