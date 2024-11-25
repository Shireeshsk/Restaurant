const express = require('express');
const router = express.Router();
const person = require('./../models/person');

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

router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newPerson = new person(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server error"});
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