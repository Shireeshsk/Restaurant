const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyparser = require('body-parser');
app.use(bodyparser.json());

const menu = require('./models/menu');

app.get('/',function(req,res){
    res.send("Welcome to my Restaurant... How can I help you!");
});

const menurouter = require('./routes/menuroute');
app.use('/item',menurouter);

const personRouter = require('./routes/personroute');
app.use('/person',personRouter);

const port = process.env.PORT || 2005;
app.listen(port,()=>{
    console.log("Server is listening on port 2500")
});