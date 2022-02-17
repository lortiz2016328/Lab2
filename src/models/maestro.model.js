const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaestroSchema = Schema({

    nombre: String,
    apellido: String,
    rol: String,
    password: String,
    cursos: [{
        curso1: { type: Schema.Types.ObjectId, ref: 'Curso' },
        curso2: { type: Schema.Types.ObjectId, ref: 'Curso' },
        curso3: { type: Schema.Types.ObjectId, ref: 'Curso' }
    }],
});

module.exports = mongoose.model('Maestro', MaestroSchema)