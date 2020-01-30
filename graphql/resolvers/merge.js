const User = require('../../models/user');
const HabitPlan = require('../../models/habitplan');
const { dateToString } = require('../../helpers/date');

const user = async userId => { 
    try{
        const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            createdHabits: habitplans.bind(this, user._doc.createdHabits);
        }
    }catch(err){
        throw err;
    }
};

const habitplans = async (planIds) => {
    try{
        const habitplans = await HabitPlan.find({_id: {$in: planIds}});
        return habitplans.map(habitplan => {
            return transformHabitPlan(habitplan);
        });
    }catch(err){
        throw err;
    }
};

const transformHabitPlan = habitplan => {
    return {
        ...habitplan._doc,
        _id: habitplan.id,
        startDate: dateToString(habitplan._doc.startDate),
        endDate: ((habitplan._doc.endDate) ? dateToString(habitplan._doc.endDate) : null),
        creator: user.bind(this, habitplan._doc.creator)
    };
};
exports.transformHabitPlan = transformHabitPlan;
