// alumno.routes.js

const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/alumno.controller');

// Ruta para el registro de un alumno
router.post('/registro', estudianteController.registrarAlumno);

// Ruta para el login de un alumno
router.post('/login', estudianteController.loginAlumno);

// Ruta para asignar un curso a un alumno
router.put('/asignar-curso/:id', estudianteController.asignarCurso);

// Ruta para obtener los cursos asignados a un alumno
router.get('/cursos-asignados/:id', estudianteController.obtenerCursosAsignados);

// Ruta para editar el perfil de un alumno
router.put('/editar-perfil/:id', estudianteController.editarPerfil);

// Ruta para eliminar el perfil de un alumno
router.delete('/eliminar-perfil/:id', estudianteController.eliminarPerfil);

module.exports = router;
