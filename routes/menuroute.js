const express = require('express');
const router = express.Router();
const menu = require('./../models/menu');

router.post('/',async (req,res)=>{
    try{
        const item = req.body;
        const newmenu = new menu(item);
        const response = await newmenu.save();
        console.log("data saved");
        res.status(200).json(newmenu); 
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server error"})
    }
});

router.get('/',async (req,res)=>{
    try{
        const data = await menu.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server error"});
    }
});

router.get('/:tastetype',async (req,res)=>{
    try{
        const tastetype = req.params.tastetype;
        if(tastetype=='spicy' || tastetype=='sweet' || tastetype=='sour'){
            const response = await menu.find({taste:tastetype});
            console.log('data fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:"Invalid taste type"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server error"});
    }
});

//comment added for testing purpose 

module.exports = router;