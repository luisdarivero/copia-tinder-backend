const Users = require('../models/Users');
const bcrypt = require('bcrypt');

module.exports = {
  create: (body) => {
    const newUser = new Users(body);
    return newUser.save();
  },
  comparePasswords: (candidatePassword, password) => {
    return bcrypt.compareSync(candidatePassword, password);
  }
}
