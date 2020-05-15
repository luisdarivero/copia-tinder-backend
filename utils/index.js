const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    createToken: (payload) => {
      const token = jwt.sign({ 
        data: payload
      }, 
      JWT_SECRET,
      {
        expiresIn: "30 days"
      }
      );
      return token;
    },
    generateQuery_find_near_users: (user) => {
      const query = [
        {
          $geoNear:{
            near: {
              type: "Point" ,
              coordinates: [ 40 , 40 ]
            },
            distanceField: "dist.calculated",
            maxDistance: user.show_people_near_to

          }
        },
        { 
          $match:{
            $and:[
              //sow_me_on_tinder = true
              {show_me_on_tinder: true},
              //active_user = true
              {active_user: true},
              //gender = show_people_with_gender
              {gender: user.show_people_with_gender},
              //TODO: use max distance
              /*{location:{
                  $near: [],
                  $maxDistance: user.show_me_people_near_to
                }
              },*/
              //min_age <birth_date< max_age
              {
                birth_date:{
                  $lte: 
                  new Date(Date.now() - (31557600000 * user.show_people_with_age_range.min_age)),
                  $gte:
                  new Date(Date.now() - (31557600000 * user.show_people_with_age_range.max_age))
                }
              },
              //userID not in  people_I_dont_like
              {_id:{$nin: user.people_I_dont_like}},
              //userID not in people_I_like
              {_id:{$nin: user.people_I_like}},
              //userID not the same as user
              {_id:{$ne: user._id}}
            ]
          }
        }
        
        //TODO: use max distance
        //TODO: userID not in matches list
      ]
      //console.dir(query[0].$match, {'maxArrayLength': null});
      return query; 
    }
}