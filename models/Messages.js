const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    date_sent:{
        type: Date, 
        required: true,
        default: Date.now()
    },
    sent_by:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    message:{
        type: String,
        required: true
    }
},{_id : false});

const Messages = mongoose.model('Messages', messagesSchema);

module.exports = {Messages, messagesSchema};