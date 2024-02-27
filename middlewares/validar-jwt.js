const jwt = require('jsonwebtoken');
const Profesor = require('../models/profesor');
const { request, response } = require('express');

const validarJWT = async(req = request, res = response, next)=> {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const profesor = await Profesor.findById(uid);
        if(!profesor){
            return res.status(401).json({
                msg: "Not found/No teacher"
            });
        }
        if(!profesor.estado){
            return res.status(401).json({
                msg: "Token no válido, usuario con estado false"
            });
        }
        req.profesor  = profesor;
        next();
    }catch(e){
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        })
    }
} 
module.exports = {
    validarJWT
}