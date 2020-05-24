const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    user:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    coach: 
    {
        type: Schema.Types.ObjectId,
        ref: 'Coach'
    }
});

module.exports = mongoose.model('Student', studentSchema);