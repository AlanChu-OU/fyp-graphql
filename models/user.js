const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password:  {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        
    },
    weight: {
        type: Number,

    },
    gender: {
        type: String,

    },
    sessionToken: {
        type: String,

    },
    createdHabits: [
        {
            type: Schema.Types.ObjectId,
            ref: 'HabitPlan'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);