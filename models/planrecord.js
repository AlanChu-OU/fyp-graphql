const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const planrecordSchema = new Schema({
    planItem: {
        type: Schema.Types.ObjectId,
        ref: 'PlanItem'
    },
    recordDate: {
        type: Date,
        required: true
    },
    progress: {
        type: Number,
        required: false
    },
    isDone: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('PlanRecord', planrecordSchema);