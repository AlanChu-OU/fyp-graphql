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
    createHabit: async (args) => {
        const habitplan = new HabitPlan({
            habitName: args.userInput.habitName,
            habitType: args.userInput.habitType,
            startDate: new Date(args.userInput.startDate),
            endDate: ((args.userInput.endDate)? new Date(args.userInput.endDate) : null),
            creator: args.userInput.creator
        });
        let createdHabitPlan;
        try{
            const result =  await habitplan.save();
            createdHabitPlan = transformHabitPlan(result);
            const creator = await User.findById(args.userInput.creator);

            if(!creator){
                throw new Error('User does not exist');
            }
            creator.createdHabitPlan.push(habitplan);
            await creator.save();

            return createdHabitPlan;
        }catch(err){
            throw err;
        }
    }
};