const User = require('../../models/user');
const HabitPlan = require('../../models/habitplan');
const { dateToString } = require('../../helpers/date');

const user = async userId => { 
    try{
        const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id
        }
    }catch(err){
        throw err;
    }
};

