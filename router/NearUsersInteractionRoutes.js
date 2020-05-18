//Se crea router usando express
const express = require('express');
const router = express.Router();

const { UsersController } = require('../controller');

//Se cargan los validadores de usuario
const { UsersValidator } = require('../validators')

//Se cargan los middlewares
const { verifySameUser } = require('../middlewares');

//TODO: borrar, este es solo un ejemplo
router.get('/nearUsers/:id',
            UsersValidator.find_near_users, 
            verifySameUser,
            UsersController.find_near_users
            );

router.post('/nearUsers/:id/dislike/:user_I_dont_like',
            verifySameUser,
            UsersController.add_person_I_dont_like
            );

module.exports = router;