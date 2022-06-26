const koaRouter = require('koa-router');
const auth =require('../middleware/auth.js');

const userRouter = new koaRouter(({ prefix: '/user' }));

const { register,login,getUser } = require('../api/user')

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/', auth ,  getUser);

userRouter.get('/l', async(ctx)=>{
    const au = await auth();
    ctx.body = au;
    ctx.status = 200
});
module.exports = userRouter;