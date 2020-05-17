const Users = require('../models/Users');
const bcrypt = require('bcrypt');

module.exports = {
  find: () => Users.find({ is_active: true }),
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
  // comparePasswords: (candidatePassword, password) => {
  //   return bcrypt.compareSync(candidatePassword, password);
  // }

  updateLocation: (user, body) =>{
    Object.assign(user.location, body);
    return user.save();
  }
}
