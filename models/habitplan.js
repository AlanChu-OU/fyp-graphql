const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const habitplanSchema = new Schema({
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
    isPublished: {
        type: Boolean,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isActive: {
        type: Boolean
    },
    createdItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'PlanItem'
        }
    ]
});

module.exports = mongoose.model('HabitPlan', habitplanSchema);