const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const {jwtauthmiddleware , generateToken} = require('./../jwt');

router.get('/',async (req,res)=>{
    try{
        const data = await person.find();
        console.log('data fetched');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server error"});
    }
});

router.get('/:worktype',async (req,res)=>{
    try{
        const worktype = req.params.worktype;
        if(worktype =='chef'||worktype=='manager' || worktype=='waiter'){
            const response = await person.find({work:worktype});
            console.log("response fetched");
            res.status(200).json(response);
        }else{
            res.status(404).json({error:"Invalid work type"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server error"});
    }
});

router.post('/signup',jwtauthmiddleware,async (req,res)=>{
    try{
        console.log("signup try")
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        const payload = {
            id:response.id,
            username:response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("token is :",token);
        res.status(200).json({response:response,token:token});
    }catch(err){
        console.log("error in saving  data" ,err);
        res.status(500).json({error:"Internal Server error"});
    }
});

router.post('/login',jwtauthmiddleware,async (req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await person.findOne({username:username});
        if(!user || !(await user.comparePassword({username:username}))){
            return res.status(401).json({error:'Invalid username or password'});
        }  
        const payload ={
            id : user.id,
            username : user.username
        } 
        const token = generateToken(payload);
        res.json({token});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const updatepersondata = req.body 

        const response = await person.findByIdAndUpdate(personId,updatepersondata,{
            new:true,
            runValidators:true
        });

        if(!response){
            return res.status(404).json({error:"person not found"});
        }

        console.log('data updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server error"});
    }
});

router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:"person not found"});
        } 
        console.log('data deleted');
        res.status(200).json({message:"person deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
});

module.exports = router;