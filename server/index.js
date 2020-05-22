//Se declara el servidor usando express
const express = require('express');
const server = express();
const fileUpload = require('express-fileupload');
const cors= require('cors');
//Se define el puerto a utilizar
const PORT = process.env.PORT || 3000;
//Se declara celebrate para validar los campos en los middlewares
const { errors } = require('celebrate');
//Se añade al servidor la opción de usar json y urlencoded
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(fileUpload({
    useTempFiles: true,
    tempFileDir : '/tmp/',
  }));
server.use(cors())

// Endpoints: se añaden rutas al servidor
server.get('/', (req, res) => res.send('Hello World!'));
server.use('/api/v1', require('../router'));

//Manejo de errores en el middleware para cachar los errores mandados por celebrate
server.use(errors());

// exportar server para poder requerirlo desde otros archivos
module.exports = { server, PORT };