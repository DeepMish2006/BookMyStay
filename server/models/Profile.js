import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        unique:true
    },
    bio:String,
    phone:String,
    gender:String,
    dob:String,
    avatar:String,
    location:String
},{timestamps:true});

export const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);