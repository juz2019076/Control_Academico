const { Schema, model} = require('mongoose');

const profesorSchema = Schema({
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
        default: "TEACHER_ROLE"
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

profesorSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...profesor} = this.toObject();
    profesor.uid = _id;
    return profesor;
};

module.exports = model('Profesor', profesorSchema);