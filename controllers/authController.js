const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req,res)=>{
    const {name,password,email,role} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
       return res.status(400).json({message:"User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        name,email,password:hashedPassword,role
    })
    res.status(201).json({message:"User created successfully"});


}

const login = async(req,res)=>{
    const {email,password} = req.body;

    const existingUser = await User.findOne({email});
    if(!existingUser){
        return res.status(400).json({message:"User doesnot exist..register first"});
    }

    const Matched = await bcrypt.compare(password,existingUser.password);
    if(!Matched){
       return res.status(401).json({message:"Password is incorrect"});
    }

   const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET)
   res.status(200).json({ message: "Login successful", token })
}

module.exports = {register,login};
