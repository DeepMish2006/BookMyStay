
import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Profile } from "../models/Profile.js";

//register
router.post("/", async (req, res) => {

  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();


    const profile = new Profile({
      user: user._id,
      bio: "",
      phone: "",
      gender: "",
      dob: null,
      avatar: "",
      location: ""
    });
    await profile.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });

  }
});


//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check email exist?
    const user = await User.findOne({ email });
    //if not
    if (!user) return res.status(401).json({ message: "Invalid credential" });
    
    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credential" });
    

    //check if profile exist
    const existingProfile = await Profile.findOne({ user: user._id });

    //if not 
    if (!existingProfile) {
      //stores new data
      const profile = new Profile({
        user: user._id,
        bio: "",
        phone: "",
        gender: "",
        dob: null,
        avatar: "",
        location: ""
      });
      await profile.save();
    }
     
    const token = jwt.sign(
      { id: user._id, isHost: user.isHost },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
// return data to user along with token
    res.json({
      user: {
        id: user._id,
        name: user.name,
        isHost: user.isHost,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;
