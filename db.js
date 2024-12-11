const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.LOCAL_DB_URL;

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("MongoDB server connected");
});

db.on('error',(err)=>{
    console.log("MongoDB connection error : ",err);
});

db.on("disconnected",()=>{
    console.log("MongoDB Disconnected");
});

module.exports = db;