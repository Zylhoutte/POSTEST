import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './subadminServer'




// Get user from localstorage

const subadmin = JSON.parse(localStorage.getItem('subadmin'))

const initialState = {
    subadmin: subadmin? subadmin : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
   
}

//Login user
export const login = createAsyncThunk('auth/login' , async (subadmin, thunkAPI) => {
    try {
        return await authService.login(subadmin)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }


})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()

})





export const subadminSlice = createSlice({
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
            state.subadmin= action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.subadmin = null   
        })
        .addCase(logout.fulfilled, (state) => {
            state.subadmin = null

        
        })
    },
})

export const {reset} = subadminSlice.actions
export default subadminSlice.reducer