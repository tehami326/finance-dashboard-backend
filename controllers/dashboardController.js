const Transaction = require('../models/Transaction')

const getSummary = async (req, res) => {
    try{
const result = await Transaction.aggregate([
        { $group: {
            _id: '$type',
            total: { $sum: '$amount' }
        }}
    ])

    const incomeData = result.find(r => r._id === 'income')
    const expenseData = result.find(r => r._id === 'expense')

    const totalIncome = incomeData ? incomeData.total : 0
    const totalExpense = expenseData ? expenseData.total : 0
    const balance = totalIncome - totalExpense

    res.status(200).json({
        totalIncome,
        totalExpense,
        balance
    })
    }catch(err){
        res.status(500).json({ message: err.message })
    }
    
}

const getCategoryTotals = async (req, res) => {
    try{
const result = await Transaction.aggregate([
        { $group: {
            _id: '$category',
            total: { $sum: '$amount' }
        }}
    ])

    res.status(200).json(result)
    }catch(err){
        res.status(500).json({ message: err.message })
    }
    
}

const getMonthlyTrends = async (req, res) => {
    try{
const result = await Transaction.aggregate([
        { $group: {
            _id: {
                month: { $month: '$date' },
                type: '$type'
            },
            total: { $sum: '$amount' }
        }},
        { $sort: { '_id.month': 1 }}
    ])

    res.status(200).json(result)
    }catch(err){
        res.status(500).json({ message: err.message })
    }
    
}

module.exports = { getSummary,getCategoryTotals, getMonthlyTrends };