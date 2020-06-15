const express=require('express');
const router=express.Router();
const User=require('../models/usersmodel');


router.get('/', async (req,res)=>{
    try{
    const users=await User.find({},['name','profilePic','group']);
    const info= {
        "CEO":users.filter(u => u.group==='CEO'),
        "CTO":users.filter(u=>u.group==='CTO'),
    };
    res.json(info);
    }
    catch (err) {
        res.json({message:err});
    };
});

//for development testing, else it will 
//be fetched from users database(Only the three required fields).
router.post('/',async (req,res)=>{
    const info=new User({
        name:req.body.name,
        profilePic:req.body.profilePic,
        group:req.body.group
    });

    try{
        const savedUser=await info.save();
        res.json({message:'success',user:savedUser});
    }
    catch (err){
        res.json({message:err});
    }    

})

module.exports=router;