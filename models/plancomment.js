const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const plancommentSchema = new Schema({
    plan: {
        type: Schema.Types.ObjectId,
        ref: 'HabitPlan' 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    content: {
        type: String,
        require: true
    },
    recordDate: {
        type: Date,
        require: true
    }
});

module.exports = mongoose.model('PlanComment', plancommentSchema);