const HabitPlan = require('../../models/habitplan');
const User = require('../../models/user');
const { transformHabitPlan } = require('./merge');

module.exports = {
    HabitPaln: async () => {
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
            creator: args.planInput.creator
        });
        let createdHabitPlan;
        try{
            const result =  await habitplan.save();
            console.log(result);
            createdHabitPlan = transformHabitPlan(result);
            const creator = await User.findById(args.planInput.creator);

            if(!creator){
                throw new Error('User does not exist');
            }
            creator.createdHabits.push(habitplan);
            await creator.save();

            return createdHabitPlan;
        }catch(err){
            throw err;
        }
    }
};