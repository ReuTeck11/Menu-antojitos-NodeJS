require('dotenv').config();

const express = require('express');
const cors = require('cors');



// Conexion a front
const morgan = require('morgan');


const { dbConnection } = require('./database/config');



// Crear el servidor de express
const app = express();

// Conexion al front
app.use(morgan('dev'));

// Configurar CORS - Conexion front
app.use(cors({ origin: 'http://localhost:4200' }));

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();


// Rutas Middlewares
app.use('/api/categoria', require('./routes/categoria'));
app.use('/api/platillo', require('./routes/platillo'));




app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});