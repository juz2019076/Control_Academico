const { Router } = require('express');
const { check } = require('express-validator');
const { estudiantePost, estudianteGet, getEstudianteById, estudiantePut, estudianteDelete } = require('../controllers/estudiante.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, esRoleValido, existeEstudianteById } = require('../helpers/db-validators');
const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo","Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos
    ], estudiantePost
);

router.get("/", estudianteGet);

router.put(
    "/:id",
    [

    ], estudiantePut);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeEstudianteById),
        check("curso", "No puedes asignarte a más de 3 cursos").isArray({max: 3}),
        check('curso.*').custom(async (cursoId, { req }) => {
                const estudianteId = req.params.id;
                if (await existeEstudianteAlumnoCurso(estudianteId, cursoId)) {
                    throw new Error('El estudiante ya está asignado a este curso');
                }
                return true;
            }),
        validarCampos
    ], getEstudianteById);

router.delete(
"/:id",
    [ 
        //validarJWT,
        //esAdminRole,
        //tieneRolAutorizado('ADMIN_ROLE','SUPER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeEstudianteById),
        validarCampos
    ], estudianteDelete);    

module.exports = router