import express from "express";

const router = express.Router();
import { Profile } from "../models/profile.js";


import  auth  from "../middleware/auth.js";


//fetch profile
router.get("/",auth,async(req,res)=>{
    try{
        const profile = await Profile.findOne({ user: req.user.id});
        if(!profile) return res.status(404).json({ message: "Profile not found"});
        res.json(profile);
    } catch(error){
        res.status(500).json({message: "Server error"});

      
    }
});


//create new profile
router.post("/",auth,async (req,res)=>{
    try {
        const profileData ={ ...req.body, user: req.user.id };//copy data 
        const existingProfile = await Profile.findOne({user: req.user.id});
        if(existingProfile) return res.status(400).json({message: "Profile already exist"});
        const profile = new Profile(profileData);//create new profile object
        await profile.save();//save the profile
        res.status(201).json({message:"profile created successfully",profile});
    } catch(error){
         res.status(500).json({message: "Server error"});
    }
});



//update profile
router.put("/",auth,async (req,res)=>{
    try{
       const updateProfile = await Profile.findOneAndUpdate(
        {
            user: req.user.id,
            
        },
        {
            $set: req.body,
        },
        {
            new:true
        }

       ) ;
       if(!updateProfile) 
        return res.status(404).json({message: "Profile not found"});
    res.json(updateProfile);//if the profile found and updated then return to the client
        } catch(error){
         
         res.status(500).json({message: "Server error"});
    }
        
});

router.delete("/",auth,async(req,res)=>{
try{
const profile = await Profile.findOneAndDelete({
    user: req.user.id
});
if(!profile) return res.status(404).json({message: "Profile not found"});
res.json({message:"profile deleted"});

} catch(error){
    res.status(500).json({message: "Server error"});
}
});







export default router;

