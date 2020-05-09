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
      console.log(req.body);
      const user = await UsersService.create(req.body);
      res.status(201).send({ message: "signup succesfull", user });
    } catch (err) {
      res.status(400).send({ message: 'Error signin up', err }); 
    }
  },
  login: async (req, res) => {
    //TODO: logica de login
  }
}
