const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coachrequestSchema = new Schema({
    coach: 
    {
        type: Schema.Types.ObjectId,
        ref: 'Coach'
    },
    userId:
    {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    message:{
        type: String
    }
});

module.exports = mongoose.model('CoachRequest', coachrequestSchema);