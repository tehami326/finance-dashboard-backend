const express = require("express");
const router = express.Router();
const { createTransaction, getTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactionController')
const protect = require('../middleware/protectMiddleware')
const roleCheck = require('../middleware/roleCheck')

router.post('/', protect, roleCheck('admin'), createTransaction)
router.get('/', protect, roleCheck('admin', 'analyst', 'viewer'), getTransaction)
router.put('/:id', protect, roleCheck('admin'), updateTransaction)
router.delete('/:id', protect, roleCheck('admin'), deleteTransaction)

module.exports = router;