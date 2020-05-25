const User = require('../../../models/user');
const Coach = require('../../../models/coach/coach');
const { user } = require('../merge')

const coach = async (coachId) => {
    try{
        const coach = await Coach.findById(coachId);
        return{
            ...coach._doc,
            _id: coach.id,
            user: user(coach._doc.user)
        }
    }catch(err){
        throw err;
    }
}
exports.coach = coach;