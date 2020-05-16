const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coachSchema = new Schema({
    user: 
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }/*,
    
    createdCoachPlan: [
        {
            type: Schema.Types.ObjectId,
            ref: 'CoachPlan'
        }
    ]*/
});

module.exports = mongoose.model('Coach', coachSchema);