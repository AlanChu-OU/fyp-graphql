const Coach = require('../../../models/coach/coach');
const User = require('../../../models/user');
const Student = require('../../../models/coach/student');
const CoachingRequest = require('../../../models/coach/coachrequest');
const CoachPlan = require('../../../models/coach/coachplan');
const CoachItem = require('../../../models/coach/coachItem');
const { transformCoach, transformStudent, transformReq, transformCoachPlan } = require('./merge');

module.exports = {
    beCoach: async (args, req) => {
        try{
            const user = await User.findById(args.userId);
            if(!user){
                throw new Error("User does not exist");
                //return { message: "ERROR: User does not exist" };
            }

            var coach = await Coach.find({ user: args.userId })
            if(coach.length > 0){
                throw new Error("Already a coach");
            }

            const newCoach = new Coach({
                user: user
            });
            const result = await newCoach.save();
            if(result){
                return { message: "SUCC"}    
            }else{
                return { message: "ERROR"}
            }
            
        }catch(err){
            if(err.name == "CastError")
                throw new Error("Invalid id");
                //return { message: 'ERROR: Invalid user id' };
            throw err;
        }
    },
    findCoaches: async (args, req)=>{
        try{
            const coaches = await Coach.find();
            return coaches.map(coach => {
                return transformCoach(coach);
            });
        }catch(err){
            throw err;
        }
    },
    getStudents: async (args, req) => {
        try{
            const coach = await Coach.findById(args.coachId);
            if(!coach){
                throw new Error("Coach does not exist");
                //return { message: "ERROR: Coach does not exist" };
            }

            const students = await Student.find({ coach: args.coachId });
            return students.map(student =>{
                return transformStudent(student);
            });
        }catch(err){
            if(err.name == "CastError")
                throw new Error("Invalid id");
                //return { message: 'ERROR: Invalid user id' };
            throw err;
        }
    },
    getCoachingReq: async (args, req) => {
        try{
            const coach = await Coach.findById(args.coachId);
            if(!coach){
                throw new Error("Coach does not exist");
            }

            const coachReq = await CoachingRequest.find({ coach: args.coachId });

            return coachReq.map(request => {
                return transformReq(request);
            });

        }catch(err){
            if(err.name == "CastError")
                throw new Error("Invalid id");
            throw err;
        }
    },
    delCoachingReq: async (args, req) => {
        try{
            const request = await CoachingRequest.findById(args.reqId);
            if(!request){
                throw new Error("Request does not exist");
            }

            const result = await CoachingRequest.deleteOne({ _id: request.id });
            if(result.deletedCount == 1){
                return { message: "SUCC" };
            }else{
                return { message: "ERROR" };
            }
        }catch(err){
            if(err.name == "CastError")
                throw new Error("Invalid id");
            throw err;
        }
    },
    assignPlan: async (args) => {
        try{
            const student = await Student.findById(args.studentId);
            if(!student){
                throw new Error("Student does not exist");
            }

            const coach = await Coach.findById(args.coachId);
            if(!coach){
                throw new Error("Coach does not exist");
            }

            if(JSON.stringify(student._doc.coach) != JSON.stringify(coach.id)){
                throw new Error("Not coach of student");
            }

            const newPlan = new CoachPlan({
                habitName: args.newPlan.habitName,
                habitType: args.newPlan.habitType,
                startDate: args.newPlan.startDate,
                endDate: ((args.newPlan.endDate) ? args.newPlan.endDate : null),
                coach: coach,
                student: student,
                status: "Pending", //Default Pending
                createdItems: []
            });

            const assignedPlan = await newPlan.save();
            if(!assignedPlan){
                return { message: "ERROR: Plan save error" };
            }

            const newItems = ((args.newPlan.Items)? args.newPlan.Items: []);
            for(var item of newItems){
                const newItem = new CoachItem({
                    coachPlan: assignedPlan,
                    itemName: item.itemName,
                    itemType: item.itemType,
                    itemGoal: ((item.itemGoal) ? item.itemGoal : null)
                });

                const assignedItem = await newItem.save();
                if(!assignedItem){
                    return { message: "ERROR: Item save error" };
                }

                await assignedPlan.createdItems.push(assignedItem);
                await assignedPlan.save();
            }

            return { message: "SUCC" };

        }catch(err){
            if(err.name == "CastError")
                throw new Error("Invalid id");
            throw err;
        }
    }
}