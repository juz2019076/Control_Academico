const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    default: 'STUDENT_ROLE'
  },
  cursos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso'
  }]
});

estudianteSchema.methods.toJSON = function(){
  const{ __v, password, _id, ...estudiante} = this.toObject();
  estudiante.uid = _id;
  return estudiante;
};

module.exports = mongoose.model('Estudiante', estudianteSchema);
