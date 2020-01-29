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
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('HabitPlan', habitplanSchema);