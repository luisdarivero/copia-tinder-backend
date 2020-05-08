//Se crea router usando express
const express = require('express');
const router = express.Router();

//TODO: borrar, este es solo un ejemplo
router.get('/holamundo', (req, res) => res.send('Hello World!'));

module.exports = router;