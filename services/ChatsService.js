const Chats  = require('../models/Chats');

module.exports = {
  create: (body) => {
    const chat = new Chats(body);
    return chat.save();
  },
  update: (currentuserPublicInformation, body) => {
    //TODO: Object.assign(currentuserPublicInformation, body);
    //TODO: return currentuserPublicInformation;
  }
}