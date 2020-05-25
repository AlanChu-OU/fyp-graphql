const Student = require('../../../models/coach/student');
const User = require('../../../models/user');
const Coach = require('../../../models/coach/coach');

module.exports = {
    addCoach: async (args, req)=>{
        try{
            const user = await User.findById(args.userId)
            if(!user){
                throw new Error("User does not exist");
                //return { message: "ERROR: User does not exist" };
            }

            const coach = await Coach.findById(args.coachId)
            if(!coach){
                throw new Error("Coach does not exist");
                //return { message: "ERROR: Coach does not exist" };
            }

            const student = await Student.find({ user: args.userId });

            const newStudent = new Student({
                user: user,
                coach: coach
            });

            const result = await newStudent.save();
        }catch(err){
            if(err.name == "CastError")
                throw new Error("Invalid id");
                //return { message: 'ERROR: Invalid user id' };
            throw err;
        }
    }
}