const User = require('../../models/user');
const HabitPlan = require('../../models/habitplan');
const PlanItem = require('../../models/planitem');
const PlanRecord = require('../../models/planrecord');
const { habitplans } = require('./merge')

module.exports = {
    pullAllPlans: async (args) => {
        try{
            const user = await User.findById(args.userId);
            if(!user){
                return new Error('User does not exist');
            }
            const habitPlanResult = await habitplans(user.createdHabits);
            return habitPlanResult;
        }catch(err){
            if(err.name == "CastError")
                return new Error("Invalid user id");
            return err;
        }
    } 
};