const jwt_simple = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_IN6BM2';

exports.crearToken = function (alumno) {
    let payload = {
        sub: alumno._id,
        nombre: alumno.nombre,
        rol: alumno.rol,
        iat: moment().unix(),
        exp: moment().day(7, 'days').unix()
    }

    return jwt_simple.encode(payload, secret);
} 