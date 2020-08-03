/* 
    Ruta: api/platillo
*/

const { Router } = require('express');

const { check } = require('express-validator');

const { getPlatillo, crearPlatillo } = require('../controllers/platillo');
const { validarCamposPlatillo } = require('../middlewares/validar-campos-platillo');

const router = Router();

router.get('/', getPlatillo);

router.post('/', [
        check('strNombre').not().isEmpty(),
        check('strDescripcion').not().isEmpty(),
        check('strIngredientes').not().isEmpty(),
        check('nmbPiezas').not().isEmpty(),
        check('nmbPrecio').not().isEmpty(),
        validarCamposPlatillo,
    ],
    crearPlatillo);

router.put('/:_id', getPlatillo);


module.exports = router;