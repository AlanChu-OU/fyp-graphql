const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coachitemSchema = new Schema({
    coachPlan: {
        type: Schema.Types.ObjectId,
        ref: 'CoachPlan'
    },
    itemName: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        required: true
    },
    itemGoal: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('CoachItem', coachitemSchema);