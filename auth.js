const passport = require('passport');
const person = require('./models/person');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(async (USERNAME,password,done)=>{
    try{
        //console.log('Received credentials: ',USERNAME,password);
        const user = await person.findOne({USERNAME});
        if(!user){
            return done(null,false,{message:'Incorrect username.'});
        }
        const ispasswordmatch = await user.comparePassword(password);
        if(ispasswordmatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message:'Incorrect password'});
        }
    }catch(err){
        return done(err);
    }
}));

module.exports = passport;