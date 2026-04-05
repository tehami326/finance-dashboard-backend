const express = require("express");
const router = express.Router();
const { getSummary, getCategoryTotals, getMonthlyTrends } = require('../controllers/dashboardController')
const protect = require('../middleware/protectMiddleware')
const roleCheck = require('../middleware/roleCheck')

router.get('/summary', protect, roleCheck('admin', 'analyst', 'viewer'), getSummary)
router.get('/category-totals', protect, roleCheck('admin', 'analyst', 'viewer'), getCategoryTotals)
router.get('/monthly-trends', protect, roleCheck('admin', 'analyst', 'viewer'), getMonthlyTrends)

module.exports = router;