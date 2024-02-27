const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  role: {
    type: String,
    default: 'STUDENT_ROLE'
  },
  estado:{
    type: Boolean,
    default: true
  },
  cursos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Curso'
  }
});

estudianteSchema.methods.toJSON = function(){
  const{ __v, password, _id, ...estudiante} = this.toObject();
  estudiante.uid = _id;
  return estudiante;
};

module.exports = mongoose.model('Estudiante', estudianteSchema);
