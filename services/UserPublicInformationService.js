const {UserPublicInformation}  = require('../models/UserPublicInformation');

module.exports = {
  create: (body) => {
    return new UserPublicInformation(body);
  },
  update: (currentuserPublicInformation, body) => {
    Object.assign(currentuserPublicInformation, body);
    return currentuserPublicInformation;
  }
}