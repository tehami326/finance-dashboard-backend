const Transaction = require('../models/Transaction')

const createTransaction = async (req,res)=>{
    try{
const {amount, type, category, date, notes} = req.body;
if(!amount || !type || !category || !date){
     return res.status(400).json({ message: "Please fill everything" })
}
    const userId = req.user.id
    
    const transaction = await Transaction.create({
    amount, type, category, date, notes,
    createdBy: userId
})
     res.status(201).json({ message: "Transaction created successfully", transaction })
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
    
}

const getTransaction = async(req,res)=>{
    try{
const { type, category, from, to } = req.query

    const filter = {}

    if(type) {
        filter.type = type
    }

    if(category) {
        filter.category = category
    }

    if(from || to) {
        filter.date = {}
        if(from) filter.date.$gte = new Date(from)
        if(to) filter.date.$lte = new Date(to)
    }

    const transaction = await Transaction.find(filter)
    res.status(200).json({ message: "Transaction got successfully", transaction })
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
}

const updateTransaction = async(req,res)=>{
    try{
const transaction = await Transaction.findByIdAndUpdate(
          req.params.id,
    req.body,
    { new: true }
    )
    if(!transaction){
    return res.status(404).json({ message: "Transaction not found" })
}
    res.status(200).json({message:"Transaction updated successfully",transaction})
    }
    catch(err){
         res.status(500).json({ message: err.message })
    }
}

const deleteTransaction = async(req,res)=>{
    try{
const transaction = await Transaction.findByIdAndDelete(req.params.id)
    if(!transaction){
    return res.status(404).json({ message: "Transaction not found" })
}
    
     res.status(200).json({message:"Transaction deleted successfully",transaction})
    }
    catch(err){
         res.status(500).json({ message: err.message })
    }

}

module.exports = { createTransaction,getTransaction,updateTransaction,deleteTransaction}