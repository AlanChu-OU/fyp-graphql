const HabitPlan = require('../../models/habitplan');
const User = require('../../models/user');
const { transformHabitPlan, habitplans } = require('./merge');

module.exports = {
    habitPlan: async () => {
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
    },
    pullAllPlans: async (args, req) => {
        if(!req.isAuth)
            return new Error("Unauthorized!");
        try{
            const user = await User.findById(req.userId);
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
    },
    setPublish: async (args, req) =>{
        if(!req.isAuth)
            return { message: "ERROR: Unauthorized!" };
        try{
            const habitplan = await HabitPlan.findById(args.plan_id);
            if(habitplan.creator != req.userId)
                return { message: "ERROR: Not plan creator" };
            habitplan.isPublished = ((args.isPublish)?args.isPublish:false);
            if (await habitplan.save())
                return { message: "SUCC" };
            else
                return { message: "ERROR"};
        }catch(err){
            return err;
        }
    },
    pushAllPlan: async ()=> {
        return { message: "no porgress xP"};
    },
    searchPlan: async (args) => {
        //if(!req.isAuth)
        //    return new Error("Unauthorized!");
        if(!args.keyword)
            args.keyword = '';
        const keyword = args.keyword.trim();
        try{
            const habitplans = await HabitPlan.find({
                isPublished: true,
                $or: [
                    {
                        habitName: { 
                            $regex: keyword,
                            $options: 'si' 
                        }
                    },
                    {
                        habitType: {
                            $regex: keyword,
                            $options: 'si'
                        }
                    }
                ]
            });
            return habitplans.map(habitplan => {
                return transformHabitPlan(habitplan);
            });
        }catch(err){
            return err;
        }
    },
    test: async (args, req) => {
        if(req.isAuth)
            return req.get('Authorization');
        else
            return "fail";
    }
};