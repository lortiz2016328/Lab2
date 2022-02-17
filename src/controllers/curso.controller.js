const Curso = require('../models/curso.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function AgregarCurso(req, res) {
    var parametros = req.body;
    var cursoModel = new Curso();

    if(parametros.nombre){
            cursoModel.nombre= parametros.nombre;

                    cursoModel.save((err, cursoGuardado) => {
                        if (err) return res.status(500)
                            .send({ mensaje: 'Error en la peticion' });
                        if(!cursoGuardado) return res.status(500)
                            .send({ mensaje: 'Error al agregar el Usuario'});
                        
                        return res.status(200).send({ curso: cursoGuardado });
                    });              
            
        }

}

function VerCursos (req, res) {
    Curso.find((err, cursosCreados) => {
        if (err) return res.send({ mensaje: "Error: " + err })

        for (let i = 0; i < cursosCreados.length; i++) {
            console.log(cursosCreados[i].nombre)
        }

        return res.send({ curso: cursosCreados })
    
    })
}

function EliminarCurso(req, res) {
    var idCurs = req.params.idCurso;

    Curso.findByIdAndDelete(idCurs, (err, cursoEliminado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!cursoEliminado) return res.status(404).send( { mensaje: 'Error al eliminar el curso'});

        return res.status(200).send({ curso: cursoEliminado});
    })
}

function EditarCurso (req, res) {
    var idCurs = req.params.idCurso;
    var parametros = req.body;

    Curso.findByIdAndUpdate(idCurs, parametros, { new: true } ,(err, cursoActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!cursoActualizado) return res.status(404).send( { mensaje: 'Error al Editar el curso'});

        return res.status(200).send({ curso: cursoActualizado});
    });
}


module.exports = {
    AgregarCurso,
    VerCursos,
    EliminarCurso,
    EditarCurso,

}