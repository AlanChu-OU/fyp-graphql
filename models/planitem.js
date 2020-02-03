const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const planitemSchema = new Schema({
    habitPlan: {
        type: Schema.Types.ObjectId,
        ref: 'HabitPlan'
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
    },
    createdRecords: [
        {
            type: Schema.Types.ObjectId,
            ref: 'PlanRecord'
        }
    ]
});

module.exports = mongoose.model('PlanItem', planitemSchema);