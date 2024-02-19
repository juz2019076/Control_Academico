const express = require('express');
const router = express.Router();
const alumnoController = require('./estudiante.routes');
const maestroController = require('./profesor.routes');

// Rutas para Alumnos
router.post('/estudiante/registro', alumnoController.registro);
router.post('/estudiante/login', alumnoController.login);
router.put('/estudiante/:id', alumnoController.actualizarPerfil);

// Rutas para Maestros
router.post('/profesor/registro', maestroController.registro);
router.post('/profesor/login', maestroController.login);
router.post('/profesor/crear-curso', maestroController.crearCurso);

module.exports = router;
