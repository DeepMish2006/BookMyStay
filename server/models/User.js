import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
name:{
    type:String,
},
email:{
    type:String,
    unique:true
},
password:String,
isHost:{
    type:Boolean,
    default:false
}
},{timestamps:true});

export const User = mongoose.model('User',userSchema);