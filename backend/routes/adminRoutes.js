const express = require('express')
const router = express.Router()
const { registerUser, loginAdmin, getMe } = require('../controllers/adminController')

const { protect } = require('../middleware/authMiddleware')


router.post('/', registerUser)
router.post('/admin', loginAdmin)








module.exports = router