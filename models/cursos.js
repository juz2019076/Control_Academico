const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'EL nombre es obligatorio'],
    unique: true
  },
  descripcion: {
    type: String,
    require: [true, 'Es necesario una breve descripción']
  },
  estado: [{
    type: Boolean,
    require: true
  }]
});

module.exports = mongoose.model('Curso', cursoSchema);
