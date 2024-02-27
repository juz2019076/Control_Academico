const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require: [true, 'EL nombre es obligatorio'],
    unique: true
  },
  descripcion: {
    type: String,
    require: [true, 'Es necesario una breve descripción']
  },
  estado: [{
    type: Boolean,
    default: true
  }]
});

module.exports = mongoose.model('Curso', cursoSchema);
