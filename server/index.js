//Se define el puerto a utilizar
const PORT = process.env.PORT || 4200;
//Se declara el servidor usando express
const express = require('express');
const cors= require('cors');
//Se declara celebrate para validar los campos en los middlewares
const { errors } = require('celebrate');
//dependencias para usar socket.io
const http = require('http');
const socketio = require('socket.io');
const socketLogic = require('./socket');

//Se crean las instancias para el servidor
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Se añade al servidor la opción de usar json y urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Se añade CORS
app.use(cors())

// Endpoints: se añaden rutas al servidor
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/v1', require('../router'));

//Manejo de errores en el middleware para cachar los errores mandados por celebrate
app.use(errors());

//Se declaran los sockets
socketLogic(io);

// exportar server para poder requerirlo desde otros archivos
module.exports = { server, PORT };