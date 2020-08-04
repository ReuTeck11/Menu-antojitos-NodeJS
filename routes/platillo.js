/* 
    Ruta: api/platillo
*/

const { Router } = require('express');

const { check } = require('express-validator');

const { getPlatillo, crearPlatillo, actualizarPlatillo } = require('../controllers/platillo');
const { validarCamposPlatillo } = require('../middlewares/validar-campos-platillo');

const router = Router();

router.get('/', getPlatillo);

router.post('/', crearPlatillo);

router.put('/:id', actualizarPlatillo);

// router.delete('/:id', borrarCategoria);



module.exports = router;