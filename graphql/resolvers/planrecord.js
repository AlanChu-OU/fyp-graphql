const PlanRecord = require('../../models/planrecord');
const PlanItem = require('../../models/planitem');
const { transformPlanRecord, pushRecords } = require('./merge');

module.exports = {
    createRecord: async (args) => {
        const planrecord = new PlanRecord({
            planItem: args.recordInput.planItem,
            recordDate: args.recordInput.recordDate,
            progress: ((args.recordInput.progress)?args.recordInput.progress:null),
            isDone: args.recordInput.isDone
        });
        let createdRecord;
        try{
            const planitem = await PlanItem.findById(args.recordInput.planItem);
            if(!planitem){
                throw new Error('Plan item not exist');
            }

            const result = await planrecord.save();
            createdRecord = transformPlanRecord(result);

            planitem.createdRecords.push(planrecord);
            await planitem.save();

            return createdRecord;
        }catch(err){
            throw err;
        }
    },
    pushRecords: async (args, req) => {
        //if(!req.isAuth)
        //    return new Error("Unauthorized!");

        try{
            planitem = await PlanItem.findById(args.item_id);
        }catch(err){
            return err;
        }

        const recordList = args.newRecords;
        const resultList = await pushRecords(args.item_id, recordList);

        return resultList;
    }
}