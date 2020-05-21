const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { messagesSchema } = require('./Messages');

const chatsSchema = new Schema({
    participants: [
        {type: Schema.Types.ObjectId, ref: 'Users'}
    ],
    pending_notifications:{
        type: Boolean,
        required: true,
        default: false
    },
    Messages: [
        messagesSchema
    ]
    
});


const Chats = mongoose.model('Chats', chatsSchema);

module.exports = Chats;