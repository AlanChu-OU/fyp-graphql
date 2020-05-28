const Coach = require('../../../models/coach/coach');
const User = require('../../../models/user');
const Student = require('../../../models/coach/student');
const { transformCoach, transformStudent } = require('./merge');

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
    }
}