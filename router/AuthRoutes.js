//Se crea router usando express
const express = require('express');
const router = express.Router();
//Se carga el controlador de usuarios
const { UsersController } = require('../controller');

router.post('/users/signup', UsersController.signup);
//TODO: router.post('/users/login', UsersController.login);

module.exports = router;