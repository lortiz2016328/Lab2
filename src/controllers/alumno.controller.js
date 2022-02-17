const Alumno = require('../models/alumno.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function RegistrarAlumno(req, res) {
    var parametros = req.body;
    var alumnoModel = new Alumno();

    if(parametros.nombre,parametros.apellido, parametros.apellido, parametros.password){
            alumnoModel.nombre= parametros.nombre;
            alumnoModel.apellido= parametros.apellido;
            alumnoModel.rol= 'ROL_ALUMNO';
            alumnoModel.password= parametros.password;
            //alumnoModel.cursos= req.user.sub;
            bcrypt.compare(parametros.password, alumnoEncontrado.password,
                (err, verificacionPassword)=>{})
            alumnoModel.save((err, alumnoGuardado) => {
                if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
                if(!alumnoGuardado) return res.status(500).send({ mensaje: "Error al guardar el alumno"});
                
                return res.status(200).send({ alumno: alumnoGuardado });
            });
        } else{
            return res.status(500).send({ mensaje: "Debe rellenar los campos necesarios." });
        }
    }
//BUSCA POR ID
function VerCursosAlumno(req, res) {
    var idAlum = req.params.idAlumno;

    Alumno.findById(idAlum, (err, alumnoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!alumnoEncontrado) return res.status(404).send( { mensaje: 'Error al obtener los datos' });

        return res.status(200).send({ alumno: alumnoEncontrado });
    })
}

function Login(req, res) {
    var parametros = req.body;
    Alumno.findOne({ rol : parametros.rol }, (err, alumnoEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(alumnoEncontrado){
            bcrypt.compare(parametros.password, alumnoEncontrado.password, 
                (err, verificacionPassword)=>{
                    if ( verificacionPassword ) {
                        if(parametros.obtenerToken === 'true'){
                            return res.status(200)
                                .send({ token: jwt.crearToken(alumnoEncontrado) })
                        } else {
                            alumnoEncontrado.password = undefined;
                            return  res.status(200)
                                .send({ alumno: alumnoEncontrado })
                        }

                        
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contrasena no coincide'});
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: 'Error, el rol no es el adecuado.'})
        }
    })
}

function EliminarAlumno(req, res) {
    var idAlum = req.params.idAlumno;

    Alumno.findByIdAndDelete(idAlum, (err, alumnoEliminado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!alumnoEliminado) return res.status(404).send( { mensaje: 'Error al eliminar el alumno'});

        return res.status(200).send({ alumno: alumnoEliminado});
    })
}

function EditarAlumno(req, res) {
    var idAlum = req.params.idAlumno;
    var parametros = req.body;    

    if ( idAlum !== req.user.sub ) return res.status(500)
        .send({ mensaje: 'No puede editar el alumno'});

    Alumno.findByIdAndUpdate(req.user.sub, parametros, {new : true},
        (err, alumnoActualizado)=>{
            if(err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if(!alumnoActualizado) return res.status(500)
                .send({ mensaje: 'Error al editar el alumno'});
            
            return res.status(200).send({alumno : alumnoActualizado})
        })
}

module.exports = {
    RegistrarAlumno,
    Login, 
    VerCursosAlumno,
    EliminarAlumno,
    EditarAlumno
}