const Users = require('../models/Users');
//TODO: const bcrypt = require('bcrypt');

module.exports = {
  create: (body) => {
    const newUser = new Users(body);
    return newUser.save();
  }
}
