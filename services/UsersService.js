const Users = require('../models/Users');
const bcrypt = require('bcrypt');

module.exports = {
  findById: (id) => Users.findById(id),
  create: (body) => {
    const newUser = new Users(body);
    return newUser.save();
  },
  find_near_users: async (interestedUser) => {
    return  await Users.aggregate(
      [
        { $match:{
            $and:
            [
              //sow_me_on_tinder = true
              {show_me_on_tinder: true},
              //active_user = true
              {active_user: true},
              //gender = show_people_with_gender
              {gender: interestedUser.show_people_with_gender},
              //TODO: use max distance
              /*{location:{
                  $near: interestedUser.location.coordinates,
                  $maxDistance: interestedUser.show_me_people_near_to
                }
              },*/
              //min_age <birth_date< max_age
              {
                birth_date:{
                  $lte: 
                  new Date(
                    Date.now() - (31557600000 * interestedUser.show_people_with_age_range.min_age)
                  ),
                  $gte:
                  new Date(
                    Date.now() - (31557600000 * interestedUser.show_people_with_age_range.max_age)
                  )
                }
              },
              //userID not in  people_I_dont_like
              {
                _id:{
                  $nin: interestedUser.people_I_dont_like
                }
              },
              //userID not in people_I_like
              {
                _id:{
                  $nin: interestedUser.people_I_like
                }
              },
              //userID not the same as interestedUser
              {
                _id:{
                  $ne: interestedUser._id
                }
              }
            ]
          }
        }


        //TODO: use max distance
        //TODO: userID not in matches list
      ]
    );
  },
  findByEmail: (email) => Users.findOne({ email }),
  update: (user, body) => {
    Object.assign(user, body);
    return user.save();
  },
  comparePasswords: (candidatePassword, password) => {
    return bcrypt.compareSync(candidatePassword, password);
  }
}
