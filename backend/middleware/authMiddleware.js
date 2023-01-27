const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Admin = require('../models/adminModel')
const SubAdmin = require('../models/subadminModel')


const protect = asyncHandler(async (req, res, next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

             // Get token from header
             token = req.headers.authorization.split(' ')[1]

             // Verify token
             const decoded = jwt.verify(token, process.env.JWT_SECRET)
             
            // Set User from the token
            req.user = await User.findById(decoded.id).select('-password')
            req.admin = await Admin.findById(decoded.id).select('-password')
            req.subadmin = await SubAdmin.findById(decoded.id).select('-password')
            

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const admin = (req, res, next) => {
    if (req.admin && req.admin.isAdmin) {
      next()
    } else {
      res.status(401)
      throw new Error('Not authorized as an admin')
    }
  }

  const subadmin = (req, res, next) => {
    if (req.subadmin && req.subadmin.isSubAdmin) {
      next()
    } else {
      res.status(401)
      throw new Error('Not authorized as an Subadmin')
    }
  }





module.exports = { protect, subadmin, admin}