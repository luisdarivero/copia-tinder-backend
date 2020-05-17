//Se crea router usando express
const express = require('express');
const router = express.Router();
//Se carga el controlador de usuarios
const { UsersController } = require('../controller');
//Se cargan los validadores de usuario
const { UsersValidator } = require('../validators')

router.post('/users/signup', UsersValidator.signup, UsersController.signup);
// router.post('/users/login', UsersController.login);

module.exports = router;