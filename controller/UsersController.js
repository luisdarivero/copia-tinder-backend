const { UsersService, UserPublicInformationService } = require('../services');
const utils = require('../utils');

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
      return res.status(201).send({ message: 'signup succesfull', user });
    } catch (err) {
      return res.status(400).send({ message: 'Error signin up', err }); 
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UsersService.findByEmail(email);
      if (!user) res.status(404).send({ message: 'User not found' });
      const isMatch = UsersService.comparePasswords(password, user.password);
      if (!isMatch) res.status(400).send({ message: 'Invalid credentials' });
      const token = utils.createToken({
        id: user._id,
        name: user.first_name,
        email: user.email,
      });
      return res.status(200).send({ message: "Welcome", token });
    } catch (error) {
      return res.status(400).send({ message: 'Error on login', error });
    }
  },
  create: async (req, res) => {
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
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send({ message: 'Error creating user', err }); 
    }
  },
  find: async (req, res) => {
    try {
      const users = await UsersService.find();
      res.status(200).send(users)
    } catch (err) {
      res.status(404).send({ message: 'Users not found', err });
    }
  }, 
  findById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UsersService.findById(id);
      res.status(200).send(user)
    } catch (err) {
      res.status(404).send({ message: 'User not found', err });
    }
  },
  findByIdAndUpdate: async (req, res) => {
   
    const { id } = req.params;
    const { body } = req;
    try {
      const user = await UsersService.findById(id);
      const updatedUser = await UsersService.update(user, body);
      res.status(200).send(updatedUser)
    } catch (err) {
      res.status(404).send({ message: 'User not found', err });
    }
  },
  find_near_users: async (req, res) => {
    try{
      const { id } = req.params;
      let user = await UsersService.findById(id);
      user = await UsersService.updateLocation(user, req.body);
      const query = utils.generateQuery_find_near_users(user);
      const near_users = await UsersService.find_near_users(query);
      //console.log(user);
      return res.status(200).send({message: 'Success', near_users});
    }
    catch(err){
      return res.status(400).send({ message: 'Error finding near users', err });    
    }
  },
  add_person_I_dont_like: async(req, res) => {
    try{
      const { id, user_I_dont_like} = req.params;
      let user = await UsersService.findById(id);
      user = await UsersService.add_person_I_dont_like(user, user_I_dont_like);
      return res.status(200).send({message: 'Success', user_I_dont_like});
    }
    catch(err){
      return res.status(400).send({ message: 'Error finding near users', err });
    }
  },
  findByIdAndDelete: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UsersService.findById(id);
      await UsersService.update(user, { active_user: false });
      res.status(204).send();
    } catch (err) {
      res.status(404).send({ message: 'Error deleting user', err });
    }
  },
}
