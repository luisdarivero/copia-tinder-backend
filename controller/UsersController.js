const { UsersService, UserPublicInformationService } = require('../services');

module.exports = {
  signup: async (req, res) => {
    try {
      //Se crea el modelo de informacion publica del usuario
      req.body.user_public_information = UserPublicInformationService.create(req.body);
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
      console.log(err);
      res.status(400).send({ message: 'Error signin up', err }); 
    }
  },
  login: async (req, res) => {
    //TODO: logica de login
  }
}
