const mongoose = require('mongoose');

const dbConnection = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('BASE DE DATOS CONCETADA');
    }catch(e){
        throw new Error('Error al conectar la base de datos', e)
    }
}

module.exports = {
    dbConnection 
}