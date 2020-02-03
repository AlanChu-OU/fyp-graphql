const PlanRecord = require('../../models/planrecord');
const PlanItem = require('../../models/planitem');
const { transformPlanRecord } = require('./merge');

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
    }
}