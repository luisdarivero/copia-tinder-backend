//Se crea router usando express
const express = require('express');
const router = express.Router();

//TODO: añadir rutas privadas
router.use(require('./UsersRoutes'));
router.use(require('./NearUsersInteractionRoutes'));

module.exports = router;