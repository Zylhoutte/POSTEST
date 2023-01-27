import axios from 'axios'


const API_URL = '/api/products/'


// Create new product
const createProduct = async (productData) => {
    const config = {
        headers: {
            Authorization: ``
        }
    }

    const response = await axios.post(API_URL, productData, config)

    return response.data
}

// Delete Product
const deleteProduct = async (productId) => {
    const config = {
        headers: {
            Authorization: ``
        }
    }

    const response = await axios.delete(API_URL + productId, config)

    return response.data
}
// Get user product
const getProducts = async () => {
    const config = {
        headers: {
            Authorization: ``
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}


//Update product
const updateProduct = async (productData) => {
    const config = {
        headers: {
            Authorization: ``
        }
    }

    const response = await axios.post(API_URL, productData, config)

    return response.data
}


const productService = {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct,
}

export default productService