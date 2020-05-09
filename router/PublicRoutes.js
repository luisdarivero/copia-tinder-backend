//Se crea router usando express
const express = require('express');
const router = express.Router();

//Se añaden rutas para signin y signup
router.use(require('./AuthRoutes'));

module.exports = router;
