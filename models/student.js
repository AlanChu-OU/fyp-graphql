const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    coachId: 
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    studentId:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Student', studentSchema);