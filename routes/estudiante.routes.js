const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { estudiantesPost } = require('../controllers/estudiante.controller');

const router = Router();

router.post(
    "/", 
    [
        check("nombreUsuario", "El nombre no puede esta vacío").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("email", "Este no es un correo válido").isEmail(),
        validarCampos,
    ], estudiantesPost);

module.exports = router;