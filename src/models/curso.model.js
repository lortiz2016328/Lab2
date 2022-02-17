const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CursoSchema = Schema({

    nombre: String
   
});

module.exports = mongoose.model('Curso', CursoSchema)