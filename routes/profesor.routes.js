const express = require('express');
const router = express.Router();
const maestroController = require('../controllers/profesor.controller');

router.post('/registro', maestroController.registro);
router.post('/login', maestroController.login);
router.post('/crear-curso', maestroController.crearCurso);

module.exports = router;
