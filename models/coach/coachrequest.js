const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coachrequestSchema = new Schema({
    coach: 
    {
        type: Schema.Types.ObjectId,
        ref: 'Coach'
    },
    user:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message:{
        type: String
    }
});

module.exports = mongoose.model('CoachRequest', coachrequestSchema);