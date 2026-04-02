const Transaction = require('../models/Transaction')

const createTransaction = async (req,res)=>{
    const {amount, type, category, date, notes} = req.body;
    const userId = req.user.id
    
    const transaction = await Transaction.create({
    amount, type, category, date, notes,
    createdBy: userId
})
     res.status(201).json({ message: "Transaction created successfully", transaction })
    
}

const getTransaction = async(req,res)=>{
    
    const transaction = await Transaction.find();
    res.status(200).json({message:"Transaction got successfully",transaction})
}

const updateTransaction = async(req,res)=>{
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

const deleteTransaction = async(req,res)=>{
    const transaction = await Transaction.findByIdAndDelete(req.params.id)
    if(!transaction){
    return res.status(404).json({ message: "Transaction not found" })
}
    
     res.status(200).json({message:"Transaction deleted successfully",transaction})

}

module.exports = { createTransaction,getTransaction,updateTransaction,deleteTransaction}