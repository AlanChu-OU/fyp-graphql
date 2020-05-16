const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coachrequestSchema = new Schema({
    coachId: 
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userId:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message:{
        type: String
    }
});

module.exports = mongoose.model('CoachRequest', coachrequestSchema);