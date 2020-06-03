const User = require('../../../models/user');
const Coach = require('../../../models/coach/coach');
const Student = require('../../../models/coach/student');
const CoachPlan = require('../../../models/coach/coachplan');
const CoachItem = require('../../../models/coach/coachItem');
const { getTransformUser } = require('../merge')
const { dateToString } = require('../../../helpers/date');

const coach = async (coachId) => {
    try{
        const coach = await Coach.findById(coachId);
        return {
            ...coach._doc,
            _id: coach.id,
            user: getTransformUser(coach._doc.user)
        }
    }catch(err){
        throw err;
    }
}
exports.getTransformCoach = coach;

const student = async (studentId) => {
    try{
        const student = await Student.findById(studentId);
        return transformStudent(student);
    }catch(err){
        throw err;
    }
}

const coachPlan = async (planId) => {
    try{
        const coachPlan = await CoachPlan.findById(planId);
        return transformCoachPlan(coachPlan);
    }catch(err){
        throw err;
    }
}

const coachItems = async (itemIds) => {
    try{
        const coachItems = await CoachItem.find({ _id: { $in: itemIds } });
        return coachItems.map(coachItem => {
            return transformCoachItem(coachItem);
        });
    }catch(err){
        throw err;
    }
}

const transformCoach = async (coach) => {
    return{
        ...coach._doc,
        _id: coach.id,
        user: getTransformUser(coach._doc.user)
    }
}
exports.transformCoach = transformCoach;

const transformStudent = async (student) => {
    return{
        ...student._doc,
        _id: student.id,
        user: getTransformUser(student._doc.user),
        coach: coach.bind(this, student._doc.coach)
    }
}
exports.transformStudent = transformStudent;

const transformReq = async (request) => {
    return {
        ...request._doc,
        _id: request.id,
        user: getTransformUser(request._doc.user),
        coach: coach.bind(this, request._doc.coach)
    }
}
exports.transformReq = transformReq;

const transformCoachPlan = async (plan) => {
    return {
        ...plan._doc,
        _id: plan.id,
        startDate: dateToString(plan._doc.startDate),
        endDate: ((plan._doc.endDate) ? dateToString(plan._doc.endDate) : null),
        coach: coach.bind(this, plan._doc.coach),
        student: student.bind(this, plan._doc.student),
        createdItems: coachItems.bind(this, plan._doc.createdItems)
    }
}
exports.transformCoachPlan = transformCoachPlan;

const transformCoachItem = async (item) => {
    return {
        ...item._doc,
        _id: item.id,
        coachPlan: coachPlan.bind(this, item._doc.coachPlan)
    }
}