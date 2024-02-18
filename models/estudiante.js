const { Schema, model} = require('mongoose');

const estudianteSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
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
        enum: "STUDENT_ROLE"
    },
    estado:{
        type: Boolean,
        default: true
    },
    cursos:{
        type: [String],
        default: []
    }
});

estudianteSchema.metmethods.toJSON = function () {
    const { __v, password, _id, ...estudiante } = this.toObject();
    estudiante.uid = _id;
    return estudiante;
};

module.exports = model('Estudiante', estudianteSchema);
