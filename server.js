const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require('./routes/authRoutes')
const transactionRoutes = require('./routes/transactionRoutes')

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionRoutes)

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Mongo db is connected")).catch((err)=>console.log("error",err));

app.get('/',(req,res)=>{
    res.json({message:"Finance dashboard is running"});
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`));
