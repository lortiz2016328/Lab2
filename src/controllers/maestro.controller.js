const Maestro = require('../models/maestro.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function RegistrarMaestro(req, res) {
    var parametros = req.body;
    var maestroModel = new Maestro();

    if(parametros.nombre, parametros.apellido, parametros.rol, parametros.password, parametros.curso1,
        parametros.curso2, parametros.curso3){
            maestroModel.nombre= parametros.nombre;
            maestroModel.apellido= parametros.apellido;
            maestroModel.rol= parametros.rol;
            maestroModel.password= parametros.password;
            maestroModel.curso1= parametros.curso1;
            maestroModel.curso2= parametros.curso2;
            maestroModel.curso3= parametros.curso3;

            if ( maestroEncontrado.length == 0 ) {

                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    maestroModel.password = passwordEncriptada;

                    maestroModel.save((err, maestroGuardado) => {
                        if (err) return res.status(500)
                            .send({ mensaje: 'Error en la peticion' });
                        if(!maestroGuardado) return res.status(500)
                            .send({ mensaje: 'Error al agregar el Maestro'});
                        
                        return res.status(200).send({ maestro: maestroGuardado });
                    });
                });                    
            } 
        }

}
function Login(req, res) {
    var parametros = req.body;
    Maestro.findOne({ rol : parametros.rol }, (err, maestroEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(maestroEncontrado){
            bcrypt.compare(parametros.password, maestroEncontrado.password, 
                (err, verificacionPassword)=>{
                    if ( verificacionPassword ) {
                        if(parametros.obtenerToken === 'true'){
                            return res.status(200)
                                .send({ token: jwt.crearToken(maestroEncontrado) })
                        } else {
                            maestroEncontrado.password = undefined;
                            return  res.status(200)
                                .send({ maestro: maestroEncontrado })
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

function EditarMaestro(req, res) {
    var idMaster = req.params.idMaestro;
    var parametros = req.body;    

    if ( idMaster !== req.user.sub ) return res.status(500)
        .send({ mensaje: 'No puede editar el maestro'});

    Maestro.findByIdAndUpdate(req.user.sub, parametros, {new : true},
        (err, maestroActualizado)=>{
            if(err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if(!maestroActualizado) return res.status(500)
                .send({ mensaje: 'Error al editar el maestro'});
            
            return res.status(200).send({maestro : maestroActualizado})
        })
}

function EliminarMaestro(req, res) {
    var idMaster = req.params.idMaestro;

    Maestro.findByIdAndDelete(idMaster, (err, maestroEliminado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!maestroEliminado) return res.status(404).send( { mensaje: 'Error al eliminar el maestro'});

        return res.status(200).send({ maestro: maestroEliminado});
    })
}

//BUSCA POR ID
function VerCursosMaestro(req, res) {
    var idMaster = req.params.idMaestro;

    Maestro.findById(idMaster, (err, maestroEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!maestroEncontrado) return res.status(404).send( { mensaje: 'Error al obtener los datos' });

        return res.status(200).send({ maestro: maestroEncontrado });
    })
}

module.exports={
    RegistrarMaestro,  
    Login,
    EditarMaestro,
    EliminarMaestro,
    VerCursosMaestro
}