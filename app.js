// Importaciones de librerías
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// Inicializaciones
const app = express();
require('dotenv').config();
require('./connection');

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configs
const port = process.env.PORT || 5000;

// Rutas
app.use('/user',require('./routes/user.routes'));
app.use('/auth',require('./routes/auth.routes'));

// Servidor en escucha
app.listen(port, ()=> console.log(`Server running on port ${port}`));

