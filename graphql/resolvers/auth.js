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

            const hasdedPassword = await bcrypt.hash(args.userInput.password);
            const newUser = new User({
                email: args.userInput.email,
                password: hasdedPassword,
                userName: args.userInput.userName
            });
            const result = await newUser.save();
            return {
                ...result._doc,
                password: null, //will not return the password
                _id: result.id
            }
        } catch (err) {
            //throw err;
            throw Error('Position 1');
        }
    },
    login: async ({email, password}) => {
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error('User does not exist');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            throw new Error('Password is incorrect');
        }
        const token = jwt.sign({userId: user.id, email: user.email}, 'secretKey');
        return {userId: user.id, token: token };
    }
};