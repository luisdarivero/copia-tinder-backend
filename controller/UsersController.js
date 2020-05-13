const { UsersService } = require('../services');

module.exports = {
  create: async (req, res) => {
    try {
      const user = await UsersService.create(req.body);
      res.status(201).send(user)
    } catch (err) {
      res.status(400).send({ message: 'Error creating user', err }); 
    }
  },
  
  signup: async (req, res) => {
    try {
      //Se asigna el genero que va a buscar por defecto en la app
      if(req.body.gender == 'Mujer'){
        req.body.show_people_with_gender = 'Hombre';
      }
      else{
        req.body.show_people_with_gender = 'Mujer'
      }
      const user = await UsersService.create(req.body);
      res.status(201).send({ message: 'signup succesfull', user });
    } catch (err) {
      res.status(400).send({ message: 'Error signin up', err }); 
    }
  },
  login: async (req, res) => {
    //TODO: logica de login
  }
}
