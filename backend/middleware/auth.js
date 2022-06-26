const pkg =require('jsonwebtoken');

const { verify } = pkg;
require('dotenv').config();



const auth =  (ctx, next) =>{
    try {
        const token = ctx.get('Authorization');
        if(!token){
            ctx.status=400;
            ctx.body="Invalid Authentication";
        }else{
            verify(token, process.env.Access_TOKEN , async(err,user) =>{
                
                if(err){
                    ctx.status=400;
                    ctx.body="Invalid Authentication";
                }else{
                    
                    
                    ctx.request.user = user;
                    await next();
                }
                                   
                                    
                
            })
        }

    
    } catch (err) {
        ctx.status=500;
        ctx.body=err.message;  
    }
}

module.exports= auth;