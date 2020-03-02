const HabitPlan = require('../../models/habitplan');
const User = require('../../models/user');
const { transformHabitPlan } = require('./merge');

module.exports = {
    HabitPlan: async () => {
        try{
            const habitplans = await HabitPlan.find();
            return habitplans.map(habitplan => {
                return transformHabitPlan(habitplan);
            });
        } catch (err) {
            throw err;
        }
    },
    createHabitPlan: async (args) => {
        const habitplan = new HabitPlan({
            habitName: args.planInput.habitName,
            habitType: args.planInput.habitType,
            startDate: new Date(args.planInput.startDate),
            endDate: ((args.planInput.endDate)? new Date(args.planInput.endDate) : null),
            isPublished: false, //default false
            creator: args.planInput.creator,
            isActive: false,    //default false
            createdItems: []
        });
        let createdHabitPlan;
        try{
            const creator = await User.findById(args.planInput.creator);
            if(!creator){
                throw new Error('User does not exist');
            }

            const result =  await habitplan.save();
            createdHabitPlan = transformHabitPlan(result);

            creator.createdHabits.push(habitplan);
            await creator.save();

            return createdHabitPlan;
        }catch(err){
            throw err;
        }
    }
};