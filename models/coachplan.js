const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coachplanSchema = new Schema({
    habitName: {
        type: String,
        required: true
    },
    habitType: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    coachId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'CoachItem'
        }
    ]
});

module.exports = mongoose.model('CoachPlan', coachplanSchema);