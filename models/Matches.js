const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchesSchema = new Schema({
    //TODO: añadir chat ID
    chat:{
        type: Schema.Types.ObjectId, 
        ref: 'Chats',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'Users',
        required: true
    },
    pending_notifications:{
        type: Boolean,
        required: true,
        default: false
    }
},{_id : false});

const Matches = mongoose.model('Matches', matchesSchema);

module.exports = {Matches, matchesSchema};