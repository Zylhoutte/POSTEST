const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const colors = require('colors')
const Product = require('./models/productModel')
const products = require('./data/products')
const connectDB = require('./config/db')
const users = require('./data/users')
const User = require('./models/userModel')
const admins = require('./data/admins')
const Admin = require('./models/adminModel')
const subadmins = require('./data/subadmin')
const SubAdmin = require('./models/subadminModel')




connectDB()

const importData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()
    await Admin.deleteMany()
  
    const createdUsers = await User.insertMany(users)

     const user = createdUsers[0]._id

    const createdAdmins = await Admin.insertMany(admins)

     const admin = createdAdmins[0]._id
    
    const createdSubAdmins = await SubAdmin.insertMany(subadmins)

     const subadmin = createdSubAdmins[0]._id

  
  

    const sampleProducts = products.map((product) => {
      return { ...product, user: user, admin:admin, subadmin:subadmin}
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
