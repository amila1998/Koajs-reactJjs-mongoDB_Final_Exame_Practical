const User = require('../db/user');
const jwt = require  ('jsonwebtoken');
require('dotenv').config();
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

const login = async(ctx)=>{
    try {
        const {email,password}=ctx.request.body;
        const user =await User.findOne({email});
        if (!user) {
            message = "Not Found User email";
            status = 400;
        } else {
            if (user.password!=password) {
                message = "Pass Incorrect";
                status = 400;
            } else {
                const accesstoken = createAccessToken({id: user._id})
                message = {msg:"success! ",accesstoken};
                status = 200;
                
            }
        }
        
    } catch (error) {
        message = error;
        status = 500;
    }
    ctx.body = message;
    ctx.status = status;
}

const  getUser = async(ctx)=>{
    try {
            const uid = await ctx.request.user.id;
       
           const user = await User.findById(uid);
           console.log("🚀 ~ file: user.js ~ line 59 ~ getUser ~ user", user)
            status=200;
            message=user;
       
    } catch (err) {
        status=500;
        message=err.message;
    }
    ctx.body = message;
    ctx.status = status;
}


const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.Access_TOKEN, {expiresIn: '1d'})
}

module.exports = { register,login ,getUser}