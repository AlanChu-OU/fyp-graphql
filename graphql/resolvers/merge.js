const User = require('../../models/user');
const HabitPlan = require('../../models/habitplan');
const PlanItem = require('../../models/planitem');
const PlanRecord = require('../../models/planrecord');
const { dateToString } = require('../../helpers/date');

const user = async userId => { 
    try{
        const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            password: null, //will not return the password
            createdHabits: habitplans.bind(this, user._doc.createdHabits)
        }
    }catch(err){
        throw err;
    }
};

const habitplans = async (planIds) => {
    try{
        const habitplans = await HabitPlan.find({_id: {$in: planIds}});
        return habitplans.map(habitplan => {
            return transformHabitPlan(habitplan);
        });
    }catch(err){
        throw err;
    }
};
exports.habitplans = habitplans;

const singlehabitplan = async (planId) => {
    try{
        const habitplan = await HabitPlan.findById(planId);
        return transformHabitPlan(habitplan);
    }catch(err){
        throw err;
    }
};

const planitems = async (itemIds) => {
    try{
        const planitems = await PlanItem.find({_id: {$in: itemIds}});
        return planitems.map(planitem => {
            return transformPlanItem(planitem);
        });
    }catch(err){
        throw err;
    }
};

const singleplanitem = async (itemId) => {
    try{
        const planitem = await PlanItem.findById(itemId);
        return transformPlanItem(planitem);
    }catch(err){
        throw err;
    }
};

const planrecords = async (recordIds) => {
    try{
        const planrecords = await PlanRecord.find({_id: {$in: recordIds}});
        return planrecords.map(planrecord => {
            return transformPlanRecord(planrecord);
        });
    }catch(err){
        throw err;
    }
};

const transformHabitPlan = habitplan => {
    return {
        ...habitplan._doc,
        _id: habitplan.id,
        startDate: dateToString(habitplan._doc.startDate),
        endDate: ((habitplan._doc.endDate) ? dateToString(habitplan._doc.endDate) : null),
        creator: user.bind(this, habitplan._doc.creator),
        createdItems: ((habitplan._doc.createdItems)? planitems.bind(this, habitplan._doc.createdItems) : [])
    };
};
exports.transformHabitPlan = transformHabitPlan;


const transformPlanItem = planitem => {
    return {
        ...planitem._doc,
        _id: planitem.id,
        habitPlan: singlehabitplan(planitem._doc.habitPlan),
        createdRecords: ((planitem._doc.createdRecords) ? planrecords.bind(this, planitem._doc.createdRecords) : [])
    };
};
exports.transformPlanItem = transformPlanItem;

const transformPlanRecord = planrecord => {
    return {
        ...planrecord._doc,
        _id: planrecord.id,
        planItem: singleplanitem(planrecord._doc.planItem),
        recordDate: dateToString(planrecord._doc.recordDate)
    }
};
exports.transformPlanRecord = transformPlanRecord;



const pushItems = async (planId, itemList = []) => {
    let plan;
    let createdItemList = [];
    try{
        plan = await HabitPlan.findById(planId);
        if(!plan){
            throw new Error('Plan item not exist');
        }
    }catch(err){
        return err;
    }

    for(var item of itemList){
        const newItem = new PlanItem({
            habitPlan: plan.id,
            itemName: item.itemName,
            itemType: item.itemType,
            itemGoal: ((item.itemGoal)?item.itemGoal:null),
            createdRecords: []
        });
        let createdItem;
        try{
            let result = await newItem.save();
            //createdItem = transformPlanItem(result);
            ////
            const newRecords = await pushRecords(result.id, item.Records);
            ////
            result = await PlanItem.findById(result._id);
            createdItem = transformPlanItem(result);
            createdItem.newRecords = newRecords;
            createdItem.localID = item.localID;
            //save to plan
            plan.createdItems.push(newItem);
            await plan.save();

            createdItemList.push(createdItem);
        }catch(err){
            return err;
        }
    }
    /*
    try{
        
    }catch(err){
        return err;
    }
    */
    return createdItemList;
}
exports.pushItems = pushItems;

const pushRecords = async (itemId, recordList=[]) => {
    let item;
    let createdRecordList = [];
    try{
        item = await PlanItem.findById(itemId);
        if(!item){
            throw new Error('Plan item not exist');
        }
    }catch(err){
        return err;
    }
    for(var record of recordList){
        const newRecord = new PlanRecord({
            planItem: item.id,
            recordDate: record.recordDate,
            progress: ((record.progress)?record.progress:null),
            isDone: record.isDone
        });
        let createdRecord;
        try{
            let result = await newRecord.save();
            createdRecord = transformPlanRecord(result);

            createdRecord.localID = record.localID;

            item.createdRecords.push(newRecord);
            await item.save();

            createdRecordList.push(createdRecord);
        }catch(err){
            return err;
        }
    }
    /*
    try{
        
    }catch(err){
        return err;
    }
    */
    return createdRecordList;
}
exports.pushRecords = pushRecords;