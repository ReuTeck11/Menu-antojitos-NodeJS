const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const CategoriaSchema = Schema({

    strNombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },

    strDescripcion: {
        type: String,
        required: [true, 'La descripcion es requerida']
    },
});

CategoriaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object._id = _id;
    return object;
});

CategoriaSchema.plugin(uniqueValidator);

module.exports = model('Categoria', CategoriaSchema);