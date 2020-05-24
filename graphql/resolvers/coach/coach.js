const Coach = require('../../../models/coach/coach');
const User = require('../../../models/user');

module.exports = {
    BeCoach: async (args, req) => {
        try{
            const user = await User.findById(args.userId);
            if(!user){
                throw new Error("User does not exist");
                //return { message: "ERROR: User does not exist" };
            }

            var coach = await Coach.find({ userId: args.userId })
            if(coach.length > 0){
                throw new Error("Already a coach");
            }

            const newCoach = new Coach({
                user: user
            });
            const result = await newCoach.save();

            return { message: "SUCC"}
        }catch(err){
            if(err.name == "CastError")
                return new Error("Invalid id");
                //return { message: 'ERROR: Invalid user id' };
            return err;
        }
    }
}