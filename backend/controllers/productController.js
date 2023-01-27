const asyncHandler = require('express-async-handler')

const Product = require('../models/productModel')
const User = require('../models/userModel')


// @desc Get product
// @route GET /api/product
// @access Private
const getProducts = asyncHandler(async (req, res) => {
    const product = await Product.find({ product: req.product.id})

    res.status(200).json(product)
})

// 

const setProduct = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')

    }
    
    const product = await Product.create({
        text: req.body.text,
        user: req.user.id,
    })



    res.status(200).json(goal)
})

// @desc Update Products

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product) {
        res.status(404)
        throw new Error('product not found')
    }

    // Check for User
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
 
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,

    })

    res.status(200).json(updatedProduct)
})

// @desc Delete products
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product) {
        res.status(404)
        throw new Error('product not found')
    }

    await product.remove()


    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getProducts,
    setProduct,
    updateProduct,
    deleteProduct,
}