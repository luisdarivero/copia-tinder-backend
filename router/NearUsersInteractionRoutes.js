//Se crea router usando express
const express = require('express');
const router = express.Router();

const { UsersController } = require('../controller');

//TODO: borrar, este es solo un ejemplo
router.get('/nearUsers/:id', UsersController.find_near_users);

module.exports = router;