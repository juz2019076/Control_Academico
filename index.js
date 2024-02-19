const express = require('express');
const app = express();
const routes = require('./routes');

// Configuración del middleware
app.use(express.json());

// Usar las rutas definidas
app.use('/index', routes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
