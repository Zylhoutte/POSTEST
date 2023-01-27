import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './adminServer'




// Get user from localstorage

const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
    admin: admin? admin : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
   
}

//Login user
export const login = createAsyncThunk('auth/login' , async (admin, thunkAPI) => {
    try {
        return await authService.login(admin)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }


})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()

})





export const adminSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.admin= action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.admin = null   
        })
        .addCase(logout.fulfilled, (state) => {
            state.admin = null

        
        })
    },
})

export const {reset} = adminSlice.actions
export default adminSlice.reducer