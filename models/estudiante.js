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
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }
});

module.exports = model('Estudiante', estudianteSchema);
