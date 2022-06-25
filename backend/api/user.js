const User = require('../db/user');

let message,status;

const register =async(ctx) => {
    try {
        const user = ctx.request.body;
        const { email, password } = user;
        
        const newUser = new User({
            email,password
        })

       await newUser.save();

        message = "done";
        status = 200;
    } catch (error) {
        message = error;
        status = 500;
    }
    ctx.body = message;
    ctx.status = status;
} 



module.exports = { register }