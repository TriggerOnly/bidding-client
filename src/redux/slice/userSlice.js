import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
    const {data} = await axios.post('/login', params)
    return data
})

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async () => {
    const {data} = await axios.get('/auth')
    return data 
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const {data} = await axios.post('/register', params)
    return data
})

const initialState ={
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.items = null
                state.status = 'error'
            })
            .addCase(fetchAuth.pending, (state) => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.items = null
                state.status = 'error'
            })
            .addCase(fetchRegister.pending, (state) => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.items = null
                state.status = 'error'
            })
    }   
})

export const selectIsAuth = state => Boolean(state.auth.data)
export const authReducer = authSlice.reducer
export const {logout} = authSlice.actions