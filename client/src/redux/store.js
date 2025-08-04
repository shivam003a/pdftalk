import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slices.js'
import chatReducer from './slices/chat.slices.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer
    }
})