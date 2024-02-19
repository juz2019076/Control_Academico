const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  maestro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Maestro'
  },
  alumnos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno'
  }]
});

module.exports = mongoose.model('Curso', cursoSchema);
