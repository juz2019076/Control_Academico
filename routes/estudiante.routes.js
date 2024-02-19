const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/estudiante.controller');

router.post('/registro', alumnoController.registro);
router.post('/login', alumnoController.login);
router.put('/perfil/:id', alumnoController.actualizarPerfil);


module.exports = router;
