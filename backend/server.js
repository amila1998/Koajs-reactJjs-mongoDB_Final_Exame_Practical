const koa = require('koa');
const json = require("koa-json");
const cors = require("koa-cors");
const bodyparser = require('koa-bodyparser');
const mongoose = require("mongoose");

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = new koa();

app.use(bodyparser());
app.use(json());
app.use(cors());

//routes
const userRouter = require('./routes/user.js');
app.use(userRouter.routes()).use(userRouter.allowedMethods());

//



//connecting to the DB
const db = mongoose.connection;
const dbupdate = {
    useNewUrlParser: true,
    useUnifiedTopology: true,

};
mongoose.connect(process.env.HOST, dbupdate);

db.on('error', (err) => console.log("Error DB Not Connected 🤢" + err));
db.on('connected', () => console.log("DB Connected  😍"));
db.on('diconnected', () => console.log("DB disconnected 🤮"));
db.on('open', () => console.log("Connection Mode 🤩! "));


//Server listening port
app.listen(PORT, () => {
    console.log("Äpp is Started on port 😀: " + PORT);
})