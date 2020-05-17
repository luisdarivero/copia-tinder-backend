//Se crea router usando express
const express = require('express');
const router = express.Router();

const { UsersController } = require('../controller');

//Se cargan los validadores de usuario
const { UsersValidator } = require('../validators')

//TODO: borrar, este es solo un ejemplo
router.get('/nearUsers/:id',UsersValidator.find_near_users, UsersController.find_near_users);

module.exports = router;