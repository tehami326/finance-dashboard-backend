const User = require('../models/User')

const getAllUsers = async (req, res) => {
    try{
const users = await User.find().select('-password')
    res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
}

const changeRole = async (req, res) => {
    try{
const user = await User.findByIdAndUpdate(
        req.params.id,
        { role: req.body.role },
        { new: true }
    ).select('-password')
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'Role updated successfully', user })
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
    
}

const deactivateUser = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
    ).select('-password')
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deactivated successfully', user })
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
    
}

module.exports = { getAllUsers, changeRole, deactivateUser }