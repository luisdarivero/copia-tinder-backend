//Se crea router usando express
const express = require('express');
const router = express.Router();

//TODO: borrar, este es solo un ejemplo
router.get('/users', (req, res) => res.send('Rutas de usuario')/*TODO: agregar controllers*/);

module.exports = router;