const HabitPlan = require('../../models/habitplan');
const User = require('../../models/user');


module.exports = {
    HabitPaln: async () => {
        try{
            const habitplans = await HabitPlan.find();
            return habitplans.map(event => {
                
            });
        } catch (err) {
            throw err;
        }
    },
    createHabit: async () => {
        try{
            
        }catch(err){
            throw err;
        }
    }
};