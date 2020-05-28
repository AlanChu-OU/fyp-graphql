const User = require('../../../models/user');
const Coach = require('../../../models/coach/coach');
const { getTransformUser } = require('../merge')

const coach = async (coachId) => {
    try{
        const coach = await Coach.findById(coachId);
        return {
            ...coach._doc,
            _id: coach.id,
            user: getTransformUser(coach._doc.user)
        }
    }catch(err){
        throw err;
    }
}
exports.getTransformCoach = coach;

const transformCoach = async (coach) => {
    return{
        ...coach._doc,
        _id: coach.id,
        user: getTransformUser(coach._doc.user)
    }
}
exports.transformCoach = transformCoach;

const transformStudent = async (student) => {
    return{
        ...student._doc,
        _id: student.id,
        user: getTransformUser(student._doc.user),
        coach: coach.bind(this, student._doc.coach)
    }
}
exports.transformStudent = transformStudent;