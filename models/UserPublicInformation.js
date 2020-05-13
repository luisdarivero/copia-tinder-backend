const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPublicInformationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    profile_photos:{
        1: {type: String, default: null},
        2: {type: String, default: null},
        3: {type: String, default: null},
        4: {type: String, default: null},
        5: {type: String, default: null},
        6: {type: String, default: null}
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