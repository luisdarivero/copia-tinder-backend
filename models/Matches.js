const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchesSchema = new Schema({
    //TODO: añadir chat ID
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'Users',
        required: true
    }
},{_id : false});

const Matches = mongoose.model('Matches', matchesSchema);

module.exports = {Matches, matchesSchema};