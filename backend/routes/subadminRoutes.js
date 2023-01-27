const express = require('express')
const router = express.Router()
const { registerUser, loginSubAdmin, getMe } = require('../controllers/subadminController')

const { protect } = require('../middleware/authMiddleware')


router.post('/', registerUser)
router.post('/subadmin', loginSubAdmin)








module.exports = router