const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPublicInformationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    profile_photos:{
        type: String, default: null,
        type: String, default: null,
        type: String, default: null,
          },
    profile_information:{
        type: String,
        default: null
    },
    profile_job:{
        type: String,
        default: null
    },
    profile_company:{
        type: String,
        default: null
    },
    profile_studies:{
        type: String,
        default: null
    },
},{_id : false});

const UserPublicInformation = mongoose.model('UserPublicInformation', userPublicInformationSchema);

module.exports = {UserPublicInformation, userPublicInformationSchema};