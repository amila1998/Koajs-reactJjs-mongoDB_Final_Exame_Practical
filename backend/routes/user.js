const koaRouter = require('koa-router');

const userRouter = new koaRouter(({ prefix: '/user' }));

const { register } = require('../api/user')

userRouter.post('/register', register);


module.exports = userRouter;