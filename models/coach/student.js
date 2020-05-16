const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    coach: 
    {
        type: Schema.Types.ObjectId,
        ref: 'Coach'
    },
    user:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Student', studentSchema);