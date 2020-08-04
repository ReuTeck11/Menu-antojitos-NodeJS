/* 
    Ruta: api/categoria
*/

const { Router } = require('express');

const { check } = require('express-validator');

const { validarCamposCategoria } = require('../middlewares/validar-campos-categoria');

const { getCategoria, crearCategoria, actualizarCategoria } = require('../controllers/categoria');

const router = Router();


router.get('/', getCategoria);

router.post('/', crearCategoria);

router.put('/:id', actualizarCategoria);





module.exports = router;