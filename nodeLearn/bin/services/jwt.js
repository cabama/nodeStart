"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//var jwt    = require ('jwt-simple');
// var moment = require('moment');
const moment = require("moment");
const jwt = require("jwt-simple");
const secret = 'Clave secreta del token';
class JwtService {
    static createToken(user) {
        var payload = {
            _id: user._id,
            username: user.username,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            image: user.image,
            iat: moment().unix(),
            exp: moment().add(30, 'days').unix
        };
        return jwt.encode(payload, secret);
    }
    ensureAuth(req, res, next) {
        if (!req.headers.authoritation) {
            return res.status(403).send({ message: 'La peticion no tiene la cabecera de autenticación' });
        }
        var token = req.headers.authoritation.replace(/['"]+/g, '');
        try {
            var payload = jwt.decode(token, secret);
            if (payload.exp <= moment().unix()) {
                return res.status(401).send({ message: 'El token ha expirado' });
            }
        }
        catch (ex) {
            console.log(ex);
            return res.status(404).send({ message: 'Token no valido.' });
        }
        req.user = payload;
        next();
    }
}
exports.JwtService = JwtService;
