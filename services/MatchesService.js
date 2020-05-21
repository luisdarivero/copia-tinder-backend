const {Matches}  = require('../models/Matches');

module.exports = {
  create: (body) => {
    return new Matches(body);
  },
  update: (currentuserPublicInformation, body) => {
    //TODO: Object.assign(currentuserPublicInformation, body);
    //TODO: return currentuserPublicInformation;
  }
}