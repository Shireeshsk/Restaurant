const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyparser = require('body-parser');
app.use(bodyparser.json());

//middleware function
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); //to move on to next phase 
}

//authentication
app.use(passport.initialize());

app.use(logRequest);

const menu = require('./models/menu');
const person = require('./models/person');
const localauthmiddleware = passport.authenticate('local',{session:false});
app.get('/',localauthmiddleware,function(req,res){
    res.send("Welcome to my Restaurant... How can I help you!");
});

const menurouter = require('./routes/menuroute');
app.use('/item',menurouter);

const personRouter = require('./routes/personroute');
app.use('/person',localauthmiddleware,personRouter);

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});