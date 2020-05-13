const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatsSchema = new Schema({
    participants: [
        {type: Schema.Types.ObjectId, ref: 'Users',required: true}
    ],
    Messages: {
        //TODO:
    },
    
});


const Chats = mongoose.model('Chats', chatsSchema);

module.exports = Chats;