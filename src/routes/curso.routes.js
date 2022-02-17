const express = require('express');
const cursoControlador = require('../controllers/curso.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/agregarCurso', cursoControlador.AgregarCurso);
api.put('/editarCurso/:idCurso', cursoControlador.EditarCurso);
api.delete('/eliminarCurso/:idCurso', cursoControlador.EliminarCurso);
api.get('/verCursos', cursoControlador.VerCursos);

module.exports = api;