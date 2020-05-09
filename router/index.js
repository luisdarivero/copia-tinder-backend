//Se crea router usando express
const express = require('express');
const router = express.Router();

//TODO: agregar middleware para verificar token
//const { verifyToken } = require('../middlewares');

//Se añaden rutas publicas
router.use(require('./PublicRoutes'));

//Se añaden rutas privadas
//TODO: router.use(verifyToken);
router.use(require('./PrivateRoutes'));

module.exports = router;