import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import productService from './productService'


const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create new product
export const createProduct = createAsyncThunk('products/create', async (productData, thunkAPI)=> {
    try {
        const token = thunkAPI.getState()
        return await productService.createProduct(productData,)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get all Products
export const getProducts = createAsyncThunk('products/getAll', async (_, thunkAPI)=> {
    try {
        const token = thunkAPI.getState()
        return await productService.getproducts()
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete product
export const deleteProduct = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState()
        return await productService.deleteGoal(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

//Update Product
export const updateProduct = createAsyncThunk('products/update', async (productData, thunkAPI)=> {
    try {
        const token = thunkAPI.getState()
        return await productService.createProduct(productData)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
           .addCase(createProduct.pending, (state) => {
            state.isLoading = true
           })
           .addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products.push(action.payload)
           })
           .addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
           })
           .addCase(getProducts.pending, (state) => {
            state.isLoading = true
           })
           .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload
           })
           .addCase(deleteProduct.pending, (state) => {
            state.isLoading = true
           })
           .addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products= state.products.filter((product) => product._id !== action.payload.id)
           })
           .addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
           })
           .addCase(updateProduct.pending, (state) => {
            state.isLoading = true
           })
           .addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products.push(action.payload)
           })
           .addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
           })

    
           
           
           
    },
})


export const {reset} = productSlice.actions
export default productSlice.reducer