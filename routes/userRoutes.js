const express = require("express");
const router = express.Router();
const { getAllUsers, changeRole, deactivateUser } = require('../controllers/userController')
const protect = require('../middleware/protectMiddleware')
const roleCheck = require('../middleware/roleCheck')

router.get('/', protect, roleCheck('admin'), getAllUsers)
router.put('/:id/role', protect, roleCheck('admin'), changeRole)
router.put('/:id/deactivate', protect, roleCheck('admin'), deactivateUser)

module.exports = router;