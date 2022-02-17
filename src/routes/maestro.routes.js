const express = require('express');
const maestroControlador = require('../controllers/maestro.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/registrarMaestro', maestroControlador.RegistrarMaestro);
api.post('/login', maestroControlador.Login);
api.put('/editarMaestro/:idMaestro', md_autenticacion.Auth, maestroControlador.EditarMaestro);
api.delete('/eliminarMaestro/:idMaestro', maestroControlador.EliminarMaestro);
api.get('/verCursosMaestro/:idMaestro', maestroControlador.VerCursosMaestro);

module.exports = api;