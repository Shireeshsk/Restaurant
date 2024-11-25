const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/Restaurant';

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