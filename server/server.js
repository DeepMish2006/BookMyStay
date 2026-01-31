import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";

import profileRoutes from "./routes/profile.js";

import listingRoutes from "./routes/listing.js";

import bookingRoutes from "./routes/bookings.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello");
});

app.use("/api/auth",authRoutes);

app.use("/api/profile",profileRoutes);

app.use("/api/listings",listingRoutes);

app.use("/api/bookings",bookingRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected"))
    
.catch((err)=>console.error(err));

const port =process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is on port ${port}`);
})
