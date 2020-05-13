const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const { userPublicInformationSchema } = require('./UserPublicInformation');
const { matchesSchema } = require('./Matches');

//Generos validos
var validGenders = {
    values: ['Hombre', 'Mujer'],
    message: '{VALUE} is not an allowed gender'
};

//Roles validos
var validRoles = {
    values: ['light', 'gold'],
    message: '{VALUE} is not an allowed role'
};

const usersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required:true,
        enum: validGenders,
    },
    birth_date:{
        type: Date,
        required: true,
        max: Date.now() - (31557600000 * 18)
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true,
          default: 'Point'
        },
        coordinates: {
          type: [Number], //longitude (between -180 and 180),latitude(between -90 and 90) 
          required: true,
          default: []
        }
    },
    people_I_dont_like: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Users'
        }
    ],
    people_I_like:[
        {
            type: Schema.Types.ObjectId, 
            ref: 'Users'
        }
    ],
    show_people_near_to:{
        type: Number,
        required: true,
        default: 10000//distance in meters
    },
    show_people_with_gender:{
        type: String,
        required: true,
        enum: validGenders
    },
    show_people_with_age_range:{
        min_age:{
            type: Number,
            default: 18,
            required: true
        },
        max_age:{
            type: Number,
            default: 60,
            required: true
        }
    },
    role: {
        type: String,
        required: true,
        default: 'light',
        enum: validRoles,
    },
    show_me_on_tinder: {
        type: Boolean,
        required: true,
        default: true,
    },
    active_user:{
        type: Boolean,
        required: true,
        default: true
    },
    user_public_information: userPublicInformationSchema,
    matches:[
        matchesSchema
    ]
});

//antes de guardar el objeto hashear la contraseña
usersSchema.pre('save', function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
  });
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;