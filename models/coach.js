const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coachSchema = new Schema({
    userId: 
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Coach', coachSchema);