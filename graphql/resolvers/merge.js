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