const { Schema, model } = require('mongoose');
const Categoria = require('../models/categoria');

const PlatilloSchema = Schema({

    strNombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true

    },

    idCategoria: {
        type: Schema.Types.ObjectId,
        required: [true, 'La categoria es requerida'],
        ref: 'Categoria'
    },

    strDescripcion: {
        type: String,
        required: [true, 'La descripción es requerida']
    },

    strIngredientes: {
        type: String,
        required: [true, 'Los ingredientes son requeridos']
    },

    nmbPiezas: {
        type: Number,
        required: [true, 'El numero de piezas es requerido']
    },

    nmbPrecio: {
        type: Number,
        required: [true, 'El precio es requerido']
    },
});

PlatilloSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object._id = _id;
    return object;
})

module.exports = model('Platillo', PlatilloSchema);