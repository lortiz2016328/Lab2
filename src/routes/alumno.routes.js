const express = require('express');
const alumnoControlador = require('../controllers/alumno.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/registrarAlumno', alumnoControlador.RegistrarAlumno);
api.post('/login', alumnoControlador.Login);
api.put('/editarAlumno/:idAlumno', md_autenticacion.Auth, alumnoControlador.EditarAlumno);
api.delete('/eliminarAlumno/:idAlumno', alumnoControlador.EliminarAlumno);
api.get('/verCursosAlumno/:idAlumno', alumnoControlador.VerCursosAlumno);

module.exports = api;