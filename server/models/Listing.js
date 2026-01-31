import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    title:String,
    description:String,
    location:String,
    price:Number,
    images:  [String],
    hostId: {type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bookingDates: [{start: Date, end: Date}],
},{timestamps:true});



export const  Listing = mongoose.model("Listing",listingSchema);