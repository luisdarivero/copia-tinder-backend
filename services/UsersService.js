const Users = require('../models/Users');
const bcrypt = require('bcrypt');

module.exports = {
  find: () => Users.find({active_user: true}),
  findById: (id) => Users.findById(id),
  create: (body) => {
    const newUser = new Users(body);
    return newUser.save();
  },
  update: (user, body) => {
    Object.assign(user, body);
    return user.save();
  },

  find_near_users: async (query) => {
    return  await Users.aggregate(
      query
    );
  },
  findByEmail: (email) => Users.findOne({ email }),
  update: (user, body) => {
    Object.assign(user, body);
    return user.save();
  },
  
  comparePasswords: (candidatePassword, password) => {
    return bcrypt.compareSync(candidatePassword, password);
  },

  updateLocation: (user, body) =>{
    Object.assign(user.location, body);
    return user.save();
  },
  add_person_I_dont_like: (user, person_I_dont_like) =>{
    user.people_I_dont_like.push(person_I_dont_like);
    return user.save();
  },
  get_user_people_I_like: () =>{
    //TODO: implementar
  }
}
