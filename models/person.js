const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const personschema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    age:{
        type : Number
    },
    work:{
        type : String,
        enum : ['chef','manager','waiter'],
        required : true
    },
    mobile:{
        type : String,
        required:true
    },
    email:{
        type : String,
        required : true,
        unique:true
    },
    address:{
        type : String
    },
    salary:{
        type : Number,
        required : true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

personschema.pre('save',async function(next){
    const person = this;

    if(!person.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(person.password,salt);
        person.password = hashedpassword;
        next();
    }catch(err){
        return next(err);
    }
});

personschema.methods.comparePassword = async function(candidatepassword){
    try{
        const isMatch = await bcrypt.compare(candidatepassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
} 
const person = mongoose.model('Person',personschema);
module.exports = person;