const mongoose = require('mongoose');

const roleSchema = Schema ({
    role:{
        type: String, 
        required: [true, 'El Role es obligatorio'],
        unique: true
    }
});

module.exports = model('Role', roleSchema);
