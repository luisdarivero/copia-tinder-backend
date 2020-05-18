//Se crea router usando express
const express = require('express');
const router = express.Router();
const { UsersController } = require('../controller');
const { UsersValidator } = require('../validators')

//TODO: borrar, este es solo un ejemplo
router.post('/users', UsersValidator.create, UsersController.create);
router.get('/users', UsersController.find);
router.get('/users/:id', UsersController.findById);
router.patch('/users/:id', UsersController.findByIdAndUpdate);
router.delete('/users/:id', UsersController.findByIdAndDelete);

module.exports = router;