const Users = require('../models/Users');
const bcrypt = require('bcrypt');

module.exports = {
  find: () => Users.find({active_user: true}),
  findById: (id) => Users.findById(id).populate('matches.user','name _id'),
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
  get_user_people_I_like: (userID) =>{
    return Users.findById(userID, 'people_I_like');
  },
  is_user_id_in_I_like: (baseUserID, userToSearchID) => {
    return Users.findOne(
      {$and:[{_id: baseUserID},{people_I_like: userToSearchID}]},
      (err, user) =>{
        if(err) throw 'Error al buscar usuario con servicio "is_user_id_in_list"';
        if(!user) return false;
        return true;
      }
    );
  },
  add_person_I_like: (user, person_I_like) =>{
    user.people_I_like.push(person_I_like);
    return user.save();
  },
  add_match: (user,match) =>{
    user.matches.push(match);
    return user.save();
  }

}
