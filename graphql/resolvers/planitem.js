const PlanItem = require('../../models/planitem');
const HabitPlan = require('../../models/habitplan');
const { transformPlanItem, pushItems } = require('./merge');

module.exports = {
    createItem: async (args) => {
        const planitem = new PlanItem({
            habitPlan: args.itemInput.habitPlan,
            itemName: args.itemInput.itemName,
            itemType: args.itemInput.itemType,
            itemGoal: ((args.itemInput.itemGoal)?args.itemInput.itemGoal:null),
            createdRecords: []
        });
        let createdPlanItem;
        try {
            const habitplan = await HabitPlan.findById(args.itemInput.habitPlan);
            if(!habitplan){
                throw new Error('Habit plan does not exist')
            }

            const result = await planitem.save();
            createdPlanItem = transformPlanItem(result);

            habitplan.createdItems.push(planitem);
            await habitplan.save();
            
            return createdPlanItem;
        }catch(err){
            throw err;
        }
    },
    pushItems: async (args, req) => {
        //if(!req.isAuth)
        //    return new Error("Unauthorized!");

        try{
            habitplan = await HabitPlan.findById(args.plan_id);
        }catch(err){
            return err;
        }

        const itemList = args.newItems;
        const resultList = await pushItems(args.plan_id, itemList);

        return resultList;
    }
};