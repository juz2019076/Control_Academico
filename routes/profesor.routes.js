const { Router } = require('express');
const { check } = require('express-validator');
const { ProfesorPost, profesorGet, profesorPut, getProfesorById, profesorDelete } = require('../controllers/profesor.controller');
const { existenteEmail, esRoleValido, existeEstudianteById, existeProfesorById } = require('../helpers/db-validators');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos
    ], ProfesorPost
);

router.put(
    "/:id",
    [

    ], profesorPut);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeProfesorById),
        validarCampos
    ], getProfesorById);

router.delete(
    "/:id",
        [   
            validarJWT,
            check('id', 'No es un id válido').isMongoId(),
            check('id').custom(existeProfesorById),
            validarCampos
        ], profesorDelete);      

router.get("/", profesorGet);


module.exports = router