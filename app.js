const express = require('express');
const cors = require('cors');
var app = express();



const MaestroRutas = require('./src/routes/maestro.routes');
const AlumnoRutas = require('./src/routes/alumno.routes');
const CursoRutas = require('./src/routes/curso.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api', MaestroRutas, AlumnoRutas, CursoRutas);


module.exports = app;