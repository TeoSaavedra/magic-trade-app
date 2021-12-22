import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import  authService  from '../../services/auth.services'
import shortid from 'shortid'
import findIndex from 'lodash/findIndex'

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData) => {
        const response = await authService.register(userData)
        return response.data
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {},
        isLoggedIn: false,
        messages: []
    },
    reducers: {
        removeMessage: (state, action) => {
            const index = findIndex(state.messages, {id: action.payload})
            if (index >= 0) {
                state.messages = [
                    ...state.messages.slice(0,index),
                    ...state.messages.slice(index + 1)
                ]
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.messages = [
                ...state.messages,
                {
                    id: shortid.generate(),
                    type: 'success',
                    text: action.payload.message
                }
            ]
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.messages = [
                ...state.messages,
                {
                    id: shortid.generate(),
                    type: 'failure',
                    text: action.payload.message
                }
            ]
        })
    }
})

export const {
    removeMessage,
} = authSlice.actions

export const authReducer =  authSlice.reducer;