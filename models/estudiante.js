const { Schema, model} = require('mongoose');

const estudianteSchema = Schema({
    nombreUsuario:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role:{
        type: String,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Estudiante', estudianteSchema);
