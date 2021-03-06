const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
    createUser: async (args) => {
        try{
            const existingUser = await User.findOne({email: args.userInput.email});
            if(existingUser){
                throw new Error('User exists already');
            }

            const hasdedPassword = await bcrypt.hash(args.userInput.password, 12);
            const newUser = new User({
                email: args.userInput.email,
                password: hasdedPassword,
                userName: args.userInput.userName,
                height: ((args.userInput.height)?args.userInput.height:null),
                weight: ((args.userInput.weight)?args.userInput.weight:null),
                gender: ((args.userInput.gender)?args.userInput.gender:null),
                sessionToken: null,
                createdHabits: []
            });

            const result = await newUser.save();
            return {
                ...result._doc,
                password: null, //will not return the password
                _id: result.id
            }
        } catch (err) {
            throw err;
        }
    },
    login: async ({email, password}) => {
        try{
            const user = await User.findOne({email: email});
            if(!user){
                throw new Error('User does not exist');
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if(!isEqual) {
                throw new Error('Password is incorrect');
            }
            const token = jwt.sign({userId: user.id, email: user.email}, 'secretKey', {  });//expiresIn: "100 days"
            user.sessionToken = token;
            const result = await user.save();
            return { userName: user.userName, userId: user.id, token: token };
        }catch(err){
            return err;
        }
    },
    logout: async (args, req) => {
        try{
            const user = await User.findById(args.userId);
            if(!user){
                throw new Error("User does not exist");
                //return { message: "ERROR: User does not exist" };
            }
            const decodedToken = await jwt.verify(args.token, "secretKey");
            if(!decodedToken){
                throw new Error('Token decode error');
                //return { message: 'ERROR: Token decode error' };
            }
            if(decodedToken.userId != args.userId){
                throw new Error('Wrong token or user');
                //return { message: 'ERROR: Wrong token or user' };
            }
            user.sessionToken = null;
            const result = await user.save();
            return { message: "SUCC" };
        }catch(err){
            if(err.name == "CastError")
                return new Error("Invalid user id");
                //return { message: 'ERROR: Invalid user id' };
            if(err.name == "JsonWebTokenError")
                return new Error("Invalid token");
                //return { message: 'Invalid token' };
            return err;
        }
    }
};